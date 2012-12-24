/*
 * grunt-contrib-jst
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        beautify: {
            tests: '<config:nodeunit.tests>',
            files: ['package.json', 'grunt.js', 'tasks/*.js']
        },
        lint: {
            all: ['grunt.js', 'tasks/**.js', '<%= nodeunit.tests %>']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                es5: true,
                strict: false
            },
            globals: {}
        },
        beautifier: {
            options: {
                indentSize: 4,
                indentChar: "\t",
                maxPreserveNewlines: 1

            }
        },

        //
        // Configuration to be run (and then tested).
        "jst-module": {
            compile: {
                files: {
                    "tmp/jst.js": ["test/fixtures/template.html"]
                },
                options: {
                    module: false
                }
            },
            compile_module: {
                files: {
                    "tmp/module_jst.js": ["test/fixtures/template.html"]
                },
                options: {
                    module: true
                }
            },
            pretty_amd: {
                options: {
                    prettify: true,
                    amdWrapper: true
                },
                files: {
                    "tmp/pretty_amd.js": ["test/fixtures/template.html"]
                }
            },
            prettify: {
                options: {
                    prettify: true,
                    module: false
                },
                files: {
                    "tmp/pretty.js": ["test/fixtures/template.html"]
                }
            },
            amd_wrapper: {
                options: {
                    amdWrapper: true

                },
                files: {
                    "tmp/amd_wrapper.js": ["test/fixtures/template.html"]
                }
            },
            uglyfile: {
                files: {
                    "tmp/uglyfile.js": ["test/fixtures/*bad-filename*"]
                }
            },
            ns_nested: {
                options: {
                    namespace: "MyApp.JST.Main"
                },
                files: {
                    "tmp/ns_nested.js": ["test/fixtures/template.html"]
                }
            },
            ns_nested_this: {
                options: {
                    namespace: "this.MyApp.JST.Main"
                },
                files: {
                    "tmp/ns_nested_this.js": ["test/fixtures/template.html"]
                }
            },
            ejsfile: {
                options: {
                    namespace: "EJS",
                    provider: "ejs"
                },
                files: {
                    "tmp/ejs.js": ["test/fixtures/template.html"]
                }
            }
        },
        //
        // Unit tests.
        nodeunit: {
            tests: ['test/jst_test.js']
        }
    });

    //	Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-beautify');


    grunt.registerTask('test', ['jst-module', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['lint']);

};
