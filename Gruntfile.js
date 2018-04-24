'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project Configuration
  grunt.initConfig({
    exec: {
      clean: {
        command: 'rm -Rf bower_components node_modules'
      }
    },
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        }
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['concat:css']
      },
      main: {
        files: [
          'app/app.js',
          'app/shared/**/*.js',
          'app/services/**/*.js',
          'app/components/**/*.js'
        ],
        tasks: ['concat:js']
      }
    },
    sass: {
      // Plugin base css; one css file for plugin
      plugin: {
        options: {
          style: 'compact',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['app/shared/sass/main.scss'],
          dest: 'www/css/',
          ext: '.css'
        }]
      },
      // Plugin skins css; one css file per skin
      skins: {
        options: {
          style: 'compact',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          flatten: false,
          cwd: 'app/skins/',
          src: ['**/main.scss'],
          dest: 'www/skins/',
          ext: '.css',
          rename: function (dest, src) {
            return dest + src.replace('/sass', '/css');
          }
        }]
      }
    },
    concat: {
      options: {
        sourceMap: false,
        sourceMapStyle: 'link' // embed, link, inline
      },
      app_js: {
        src: [
          'app/app.js',
          'app/shared/**/*.js',
          'app/services/**/*.js',
          'app/components/**/*.js',
          'app/IndexCtrl.js'
        ],
        dest: 'www/js/app.js'
      },
      app_css: {
        src: ['www/css/main.css'],
        dest: 'www/css/main.css'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      release: {
        files: {
          'www/js/app.js': ['www/js/app.js']
        }
      }
    },
    nggettext_extract: {
      pot: {
        files: {
          'i18n/po/template.pot': [
            'app/**/*.html',
            'app/**/*.js'
          ]
        }
      }
    },
    nggettext_compile: {
      all: {
        options: {
          module: 'starterApp'
        },
        files: {
          'app/shared/translations/translations.js': ['i18n/po/*.po']
        }
      }
    },
    clean: {
      release: [
        'release/'
      ]
    },
    copy: {
      app_root: {
        expand: true,
        flatten: false,
        cwd: 'app/',
        src: 'index.html',
        dest: 'www/'
      },
      app_views: {
        expand: true,
        flatten: false,
        cwd: 'app/components',
        src: '**/*.html',
        dest: 'www/views/'
      },
      app_shared: {
        expand: true,
        flatten: false,
        cwd: 'app/shared',
        src: '**/*.html',
        dest: 'www/shared/'
      },
      app_imgs: {
        expand: true,
        flatten: false,
        cwd: 'app/assets/img',
        src: '**/*',
        dest: 'www/img/'
      },
      app_skins: {
        expand: true,
        flatten: false,
        cwd: 'app/skins',
        src: ['**/*', '!**/sass/**'], // Don't bring sass files into the app
        dest: 'www/skins/'
      },
      release: {
        expand: true,
        flatten: false,
        cwd: '',
        src: [
          'www/**/*'
        ],
        dest: 'release'
      },
      plugin_client_js: {
        expand: false,
        flatten: false,
        cwd: '',
        src: 'node_modules/@owstack/ows-wallet-plugin-client/release/ows-wallet-plugin-client.min.js',
        dest: 'www/lib/ows-wallet-plugin-client.js'
      },
      plugin_client_css: {
        expand: false,
        flatten: false,
        cwd: '',
        src: 'node_modules/@owstack/ows-wallet-plugin-client/release/ows-wallet-plugin-client.css',
        dest: 'www/css/ows-wallet-plugin-client.css'
      },
      plugin_client_bundle_js: {
        expand: false,
        flatten: false,
        cwd: '',
        src: 'node_modules/@owstack/ows-wallet-plugin-client/release/ows-wallet-plugin-client.bundle.min.js',
        dest: 'www/lib/ows-wallet-plugin-client.js'
      },
      plugin_client_bundle_css: {
        expand: false,
        flatten: false,
        cwd: '',
        src: 'node_modules/@owstack/ows-wallet-plugin-client/release/ows-wallet-plugin-client.bundle.css',
        dest: 'www/css/ows-wallet-plugin-client.css'
      }
    }
  });

  function releasePluginConfig() {
    var pkg = grunt.file.readJSON('package.json');
    var plugin = grunt.file.readJSON('plugin.json');
    plugin.header.version = pkg.version;
    plugin.header.description = pkg.description;
    plugin.header.author = pkg.author;
    grunt.file.write('release/plugin.json', JSON.stringify(plugin, null, 2));
  };

  grunt.registerTask('releasePluginConfig', 'Create the release plugin configuration.', function() {
    releasePluginConfig();
  });

  grunt.registerTask('default', [
    'sass',
    'concat:app_js',
    'concat:app_css',
    'copy:plugin_client_bundle_js',
    'copy:plugin_client_bundle_css',
    'copy:app_root',
    'copy:app_views',
    'copy:app_shared',
    'copy:app_imgs',
    'copy:app_skins'
  ]);

  grunt.registerTask('release', [
    'default',
    'copy:plugin_client_js',
    'copy:plugin_client_css',
    'uglify',
    'clean:release',
    'copy:release',
    'releasePluginConfig'
  ]);

  grunt.registerTask('translate', ['nggettext_extract']);
};
