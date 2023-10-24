---
title: Dynamic SSL with Nginx
slug: 'dynamic-ssl-with-nginx'
description: ''
published_date: 2015-12-13T12:57:53.000Z
created_date: 2015-12-13T12:57:53.000Z
modified_date: 2015-12-13T12:57:53.000Z
preview: ''
draft: false
tags: []
categories: []
authors:
  - ImLunaHey
---

Since LetsEncrypt announced they'd be entering public Beta I wondered how I could use the fact that I can get free SSL certs issued at any time. Obviously if I wanted an SSL cert for each subdomain I use I could either get them issued manually using some kind of online look such as gethttpsforfree or setup some kind of bash script to make them for me.

So for the most part I used gethttpsforfree, this domain and most of the other person domains I used have all had their certs issues with it but then it got to the point where using the site just didn't wasn't feasible. Before writing this post I had about 50 sub/domains with LetsEncrypt SSL certs, after this post I'll probably have close to 500 here's how I'm going to deal with it.

#### Getting the certs issued.

Since all the new certs I'll need will be for the social network I'm developing they'll all be subdomains of alete.xyz and since I use Nginx I can't use "dynamic" SSL certs as Nginx needs to be able to load them on startup.

This script will issue a SSL cert using the subDomain that I provide, for example `./makeSSL.sh xo` will generate a cert for `xo.alete.xyz`. This is all good everything but Nginx doesn't give two shits about a SSL cert I made without actually telling it about the domain and that's where the second bit of the script comes into place. It copies the sample config I have and uses `sed` to replace `subDomain` with the parameter I provided the script before, in this case that'd be xo.

```sh
DOMAIN=$1.alete.xyz;
EMAIL=xo@alete.xyz;
mkdir /etc/nginx/ssl/${DOMAIN};
chmod 700 /etc/nginx/ssl/${DOMAIN};
cd /etc/nginx/ssl/${DOMAIN};
simp_le -d ${DOMAIN}:/tmp/letsencrypt --email ${EMAIL} -f account_key.json -f key.pem -f cert.pem -f fullchain.pem && rm -rf /tmp/letsencrypt/* && service nginx reload;
chmod -R 400 /etc/nginx/ssl/${DOMAIN}/*;

sed "s/subDomain/$1/g" /home/xo/nginx-sample > /etc/nginx/sites-available/$1.alete.xyz
sudo ln -s /etc/nginx/sites-available/$1.alete.xyz /etc/nginx/sites-enabled/$1.alete.xyz
sudo nginx -s reload
```

Then it just reloads Nginx, if all goes well the new domain should now be serving content over SSL.

For those needing the sample config I use here ya go.

```nginx
server {
    listen 443 ssl spdy;
    server_name subDomain.alete.xyz;

    gzip on;

    pagespeed On;
    pagespeed FileCachePath "/var/cache/ngx_pagespeed/";
    pagespeed EnableFilters combine_css,combine_javascript;
    pagespeed XHeaderValue "<-- This shit is fast!";
    pagespeed EnableFilters collapse_whitespace;

    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_certificate /etc/nginx/ssl/subDomain.alete.xyz/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/subDomain.alete.xyz/key.pem;
    ssl_trusted_certificate /etc/nginx/ssl/subDomain.alete.xyz/fullchain.pem;

    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_protocols TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!kRSA:!MD5:!RC4;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;

    access_log /var/log/nginx/subDomain.alete.xyz.log;

    # All requests
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://alete_xyz;
        proxy_redirect off;
    }

    include /etc/nginx/snippets/letsencrypt.conf;
}
```

I used the instructions on here to get everything setup before running my own scripts. Keep in mind you/I still need to setup a renewal script which will probably come down to inserting a new line into chron like this. Remember to replace the `%%DOMAINS%%` with your domain, if you're going to add something like this to the bash script you can use `$1.alete.xyz` or whatever your domain is to dynamically generate the line.

```
00 1 * * * /usr/local/sbin/certrenew %%DOMAINS%% || true
```
