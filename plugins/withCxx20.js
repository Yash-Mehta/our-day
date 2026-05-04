const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withCxx20(config) {
  return withDangerousMod(config, [
    'ios',
    (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf-8');

      const injection = `
    # Set C++20 standard for all targets (required by Folly in RN 0.81)
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |cfg|
        cfg.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++20'
      end
    end

    # Create missing folly/coro/Coroutine.h that ReactNativeDependencies omits
    require 'fileutils'
    folly_coro_dir = File.join(installer.sandbox.root, 'Headers/Public/ReactNativeDependencies/folly/coro')
    FileUtils.mkdir_p(folly_coro_dir)
    coroutine_h = File.join(folly_coro_dir, 'Coroutine.h')
    unless File.exist?(coroutine_h)
      File.write(coroutine_h, <<~HEADER)
        #pragma once
        #include <folly/Portability.h>
        #if FOLLY_HAS_COROUTINES
        #include <coroutine>
        namespace folly::coro {
        using coroutine_handle = std::coroutine_handle<>;
        template <typename Promise>
        using coroutine_handle_t = std::coroutine_handle<Promise>;
        using suspend_always = std::suspend_always;
        using suspend_never = std::suspend_never;
        } // namespace folly::coro
        #endif
      HEADER
    end
`;

      if (!contents.includes('CLANG_CXX_LANGUAGE_STANDARD')) {
        contents = contents.replace(
          /post_install do \|installer\|/,
          `post_install do |installer|\n${injection}`
        );
        fs.writeFileSync(podfilePath, contents, 'utf-8');
      }

      return config;
    },
  ]);
};
