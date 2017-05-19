module.exports = grunt => {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		watch: {
			scss: {
				files: ['src/css/*.scss'],
				tasks: ['sass:dist'],
				options: {
					spawn: false
				}
			},
			scssVendors: {
				files: ['src/css/vendors/*.scss'],
				tasks: ['sass:vendors'],
				options: {
					spawn: false
				}
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['babel'],
				options: {
					spawn: false
				}
			},
			imgs: {
				files: ['src/images/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			},
			pug: {
				files: ['src/view/*.pug'],
				tasks: ['pug'],
				options: {
					spawn: false
				}
			}
		},
		pug: {
			compile: {
				files: [{
					expand: true,
					cwd: 'src/view',
					src: ['*.pug'],
					dest: 'dist/',
					ext: '.html',
				}],
			}
		},
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/css',
					src: ['*.scss'],
					dest: 'dist/css',
					ext: '.css',
				}],
			},
			vendors: {
				files: [{
					expand: true,
					cwd: 'src/css/vendors',
					src: ['*.scss'],
					dest: 'dist/css/vendors',
					ext: '.css',
				}],
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ['es2015'],
				comments: false,
				sourceMaps: true,
				minified: true,
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: '*.js',
					dest: 'dist/js',
					ext: '.js',
				}]
			}
		},
		// uglify: {
		// 	js: {
		// 		options: {
		// 			sourceMap: true
		// 		},
		// 		files: [{
		// 			expand: true,
		// 			cwd: 'src/js',
		// 			src: '*.js',
		// 			dest: 'dist/js',
		// 			ext: '.js',
		// 		}]
		// 	}
		// },
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/images/'
				}]
			}
		},
		copy: {
			fonts: {
				files: [{
					expand: true,
					cwd: 'src/fonts',
					src: ['**/*'],
					dest: 'dist/fonts'
				}]
			},
			main: {
				files: [{
					expand: true,
					cwd: 'src/main',
					src: ['*.*'],
					dest: 'dist'
				}],
			},
		},
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['imagemin', 'pug', 'babel', 'sass', 'copy']);
	grunt.registerTask('init', ['imagemin', 'pug', 'babel', 'sass', 'copy']);
};
