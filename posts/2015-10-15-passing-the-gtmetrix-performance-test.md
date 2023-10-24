---
title: Passing the gtmetrix performance test
slug: 'padding-the-gtmetrix-performance-test'
description: ''
published_date: 2015-10-15T14:56:55.000Z
created_date: 2015-10-15T14:56:55.000Z
modified_date: 2015-10-15T14:56:55.000Z
preview: ''
draft: false
tags: []
categories: []
authors:
  - ImLunaHey
---

Most people wouldn't worry about passing all server/website tests but I for one am proud to know that this site passes almost all that I've tried with a score between 95 and 100 percent.

Unlike most tests gtmetrix isn't about getting 100%, it's about showing you how and why your site is performing the way it is. For example quite a few sites "fail" the YSlow cdn test simply because they're not using a CDN whether that's because they don't need one or because they honestly just can't afford one.

You're probably now asking yourself how I got 100% for the YSlow test since I don't actually run more than a single server and definitely don't have the money to use a commercial CDN. What I've done is use a fake CDN, I've setup a subdomain with a free SSL cert from WoSign and told it to proxy all of the static types to my nodejs backend just like my normal domain does but instead of also proxying HTML files it just sends a 404.

```nginx
upstream wvvw_me {
    server 127.0.0.1:3200;
}

location ~* \.(jpg|jpeg|gif|png|css|js|ico|xml)$ {
    access_log off;
    log_not_found off;
    expires 30d;
    proxy_pass http://wvvw_me;
}

location / {
    return 404;
}
```

Another simple one to pass is Minify CSS and JS tests, for this I use bower and Grunt. Bower lets me keep only my minified version of libraries without having to check the non-minified versions into git.

```js
module.exports = function (grunt) {
  grunt.initConfig({
    bower_concat: {
      all: {
        dest: './_bower.js',
        cssDest: './_bower.css',
        exclude: [],
        dependencies: {},
        bowerOptions: {
          relative: false,
        },
      },
    },
    uglify: {
      my_target: {
        files: {
          './public/js/_bower.min.js': ['./_bower.js'],
        },
      },
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          './public/css/core.min.css': ['./public/css/core.css'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['bower_concat', 'uglify', 'cssmin']);
};
```

Obviously there's still a few tests that you may fail but for the most part these tips along with a standard nginx config should let you pass at least most of the tests.
