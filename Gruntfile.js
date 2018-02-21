module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      connect: {
          server: {
              options: {
                port: 8080,
                protocol: 'http',
                keepalive: true,
                base: 'public'
              }
          }
      }
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-connect');
  
    // Default task(s).
    grunt.registerTask('default', ['connect']);
  
  };