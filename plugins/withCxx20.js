const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withCxx20(config) {
  return withDangerousMod(config, [
    'ios',
    (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf-8');

      const patch = `
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |cfg|
      cfg.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++20'
    end
  end
end
`;

      if (!contents.includes('CLANG_CXX_LANGUAGE_STANDARD')) {
        contents += patch;
        fs.writeFileSync(podfilePath, contents, 'utf-8');
      }

      return config;
    },
  ]);
};
