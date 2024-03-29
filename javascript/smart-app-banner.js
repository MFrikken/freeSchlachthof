(function(q) {
    "object" === typeof exports && "undefined" !== typeof module ? module.exports = q() : "function" === typeof define && define.amd ? define([], q) : ("undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : this).SmartBanner = q()
  }
)(function() {
  return function c(f, h, e) {
    function b(d, g) {
      if (!h[d]) {
        if (!f[d]) {
          var l = "function" == typeof require && require;
          if (!g && l)
            return l(d, !0);
          if (a)
            return a(d, !0);
          l = Error("Cannot find module '" + d + "'");
          throw l.code = "MODULE_NOT_FOUND",
            l;
        }
        l = h[d] = {
          exports: {}
        };
        f[d][0].call(l.exports, function(a) {
          var e = f[d][1][a];
          return b(e ? e : a)
        }, l, l.exports, c, f, h, e)
      }
      return h[d].exports
    }
    for (var a = "function" == typeof require && require, g = 0; g < e.length; g++)
      b(e[g]);
    return b
  }({
    1: [function(c, f, h) {
      var e = c("xtend/mutable")
        , b = c("component-query")
        , a = c("get-doc")
        , g = a && a.documentElement
        , d = c("cookie-cutter")
        , u = c("ua-parser-js")
        , l = (navigator.language || navigator.userLanguage || navigator.browserLanguage).slice(-2) || "us"
        , m = {
        ios: {
          appMeta: "apple-itunes-app",
          iconRels: ["apple-touch-icon-precomposed", "apple-touch-icon"],
          getStoreLink: function() {
            return "https://itunes.apple.com/" + this.options.appStoreLanguage + "/app/id" + this.appId
          }
        },
        android: {
          appMeta: "google-play-app",
          iconRels: ["android-touch-icon", "apple-touch-icon-precomposed", "apple-touch-icon"],
          getStoreLink: function() {
            return "http://play.google.com/store/apps/details?id=" + this.appId
          }
        },
        windows: {
          appMeta: "msApplication-ID",
          iconRels: ["windows-touch-icon", "apple-touch-icon-precomposed", "apple-touch-icon"],
          getStoreLink: function() {
            return "http://www.windowsphone.com/s?appid=" + this.appId
          }
        }
      };
      c = function(a) {
        var b = u(navigator.userAgent);
        this.options = e({}, {
          daysHidden: 15,
          daysReminder: 90,
          appStoreLanguage: l,
          button: "OPEN",
          store: {
            ios: "On the App Store",
            android: "In Google Play",
            windows: "In the Windows Store"
          },
          price: {
            ios: "FREE",
            android: "FREE",
            windows: "FREE"
          },
          theme: "",
          icon: "",
          force: ""
        }, a || {});
        this.options.force ? this.type = this.options.force : "Windows Phone" === b.os.name || "Windows Mobile" === b.os.name ? this.type = "windows" : "iOS" === b.os.name ? this.type = "ios" : "Android" === b.os.name && (this.type = "android");
        !this.type || "ios" === this.type && "Mobile Safari" === b.browser.name && 6 <= parseInt(b.os.version) || navigator.standalone || d.get("smartbanner-closed") || d.get("smartbanner-installed") || (e(this, m[this.type]),
        this.parseAppId() && (this.create(),
          this.show()))
      }
      ;
      c.prototype = {
        constructor: c,
        create: function() {
          var e = this.getStoreLink(), d = this.options.price[this.type] + " - " + this.options.store[this.type], r;
          if (this.options.icon)
            r = this.options.icon;
          else
            for (var g = 0; g < this.iconRels.length; g++) {
              var t = b('link[rel="' + this.iconRels[g] + '"]');
              if (t) {
                r = t.getAttribute("href");
                break
              }
            }
          var c = a.createElement("div");
          c.className = "smartbanner smartbanner-" + (this.options.theme || this.type);
          c.innerHTML = '<div class="smartbanner-container"><a href="javascript:void(0);" class="smartbanner-close">&times;</a><span class="smartbanner-icon" style="background-image: url(' + r + ')"></span><div class="smartbanner-info"><div class="smartbanner-title">' + this.options.title + "</div><div>" + this.options.author + "</div><span>" + d + '</span></div><a href="' + e + '" class="smartbanner-button"><span class="smartbanner-button-text">' + this.options.button + "</span></a></div>";
          a.body ? a.body.appendChild(c) : a && a.addEventListener("DOMContentLoaded", function() {
            a.body.appendChild(c)
          });
          b(".smartbanner-button", c).addEventListener("click", this.install.bind(this), !1);
          b(".smartbanner-close", c).addEventListener("click", this.close.bind(this), !1)
        },
        hide: function() {
          g.classList.remove("smartbanner-show")
        },
        show: function() {
          g.classList.add("smartbanner-show")
        },
        close: function() {
          this.hide();
          d.set("smartbanner-closed", "true", {
            path: "/",
            expires: new Date(+new Date + 864E5 * this.options.daysHidden)
          })
        },
        install: function() {
          this.hide();
          d.set("smartbanner-installed", "true", {
            path: "/",
            expires: new Date(+new Date + 864E5 * this.options.daysReminder)
          })
        },
        parseAppId: function() {
          var a = b('meta[name="' + this.appMeta + '"]');
          if (a)
            return this.appId = "windows" === this.type ? a.getAttribute("content") : /app-id=([^\s,]+)/.exec(a.getAttribute("content"))[1]
        }
      };
      f.exports = c
    }
      , {
        "component-query": 2,
        "cookie-cutter": 3,
        "get-doc": 4,
        "ua-parser-js": 6,
        "xtend/mutable": 7
      }],
    2: [function(c, f, h) {
      function e(b, a) {
        return a.querySelector(b)
      }
      h = f.exports = function(b, a) {
        a = a || document;
        return e(b, a)
      }
      ;
      h.all = function(b, a) {
        a = a || document;
        return a.querySelectorAll(b)
      }
      ;
      h.engine = function(b) {
        if (!b.one)
          throw Error(".one callback required");
        if (!b.all)
          throw Error(".all callback required");
        e = b.one;
        h.all = b.all;
        return h
      }
    }
      , {}],
    3: [function(c, f, h) {
      h = f.exports = function(e) {
        e || (e = {});
        "string" === typeof e && (e = {
          cookie: e
        });
        void 0 === e.cookie && (e.cookie = "");
        return {
          get: function(b) {
            for (var a = e.cookie.split(/;\s*/), g = 0; g < a.length; g++) {
              var d = a[g].split("=");
              if (unescape(d[0]) === b)
                return unescape(d[1])
            }
          },
          set: function(b, a, g) {
            g || (g = {});
            b = escape(b) + "=" + escape(a);
            g.expires && (b += "; expires=" + g.expires);
            g.path && (b += "; path=" + escape(g.path));
            return e.cookie = b
          }
        }
      }
      ;
      "undefined" !== typeof document && (c = h(document),
        h.get = c.get,
        h.set = c.set)
    }
      , {}],
    4: [function(c, f, h) {
      c = c("has-dom");
      f.exports = c() ? document : null
    }
      , {
        "has-dom": 5
      }],
    5: [function(c, f, h) {
      f.exports = function() {
        return "undefined" !== typeof window && "undefined" !== typeof document && "function" === typeof document.createElement
      }
    }
      , {}],
    6: [function(c, f, h) {
      (function(e, b) {
          var a = {
            extend: function(a, b) {
              for (var e in b)
                -1 !== "browser cpu device engine os".indexOf(e) && 0 === b[e].length % 2 && (a[e] = b[e].concat(a[e]));
              return a
            },
            has: function(a, b) {
              return "string" === typeof a ? -1 !== b.toLowerCase().indexOf(a.toLowerCase()) : !1
            },
            lowerize: function(a) {
              return a.toLowerCase()
            },
            major: function(a) {
              return "string" === typeof a ? a.split(".")[0] : b
            }
          }
            , g = function() {
            for (var a, e = 0, c, g, d, k, h, f, l = arguments; e < l.length && !h; ) {
              var m = l[e]
                , n = l[e + 1];
              if ("undefined" === typeof a)
                for (d in a = {},
                  n)
                  n.hasOwnProperty(d) && (k = n[d],
                    "object" === typeof k ? a[k[0]] = b : a[k] = b);
              for (c = g = 0; c < m.length && !h; )
                if (h = m[c++].exec(this.getUA()))
                  for (d = 0; d < n.length; d++)
                    f = h[++g],
                      k = n[d],
                      "object" === typeof k && 0 < k.length ? 2 == k.length ? a[k[0]] = "function" == typeof k[1] ? k[1].call(this, f) : k[1] : 3 == k.length ? a[k[0]] = "function" !== typeof k[1] || k[1].exec && k[1].test ? f ? f.replace(k[1], k[2]) : b : f ? k[1].call(this, f, k[2]) : b : 4 == k.length && (a[k[0]] = f ? k[3].call(this, f.replace(k[1], k[2])) : b) : a[k] = f ? f : b;
              e += 2
            }
            return a
          }
            , d = function(e, d) {
            for (var c in d)
              if ("object" === typeof d[c] && 0 < d[c].length)
                for (var g = 0; g < d[c].length; g++) {
                  if (a.has(d[c][g], e))
                    return "?" === c ? b : c
                }
              else if (a.has(d[c], e))
                return "?" === c ? b : c;
            return e
          }
            , c = {
            ME: "4.90",
            "NT 3.11": "NT3.51",
            "NT 4.0": "NT4.0",
            2E3: "NT 5.0",
            XP: ["NT 5.1", "NT 5.2"],
            Vista: "NT 6.0",
            7: "NT 6.1",
            8: "NT 6.2",
            "8.1": "NT 6.3",
            10: ["NT 6.4", "NT 10.0"],
            RT: "ARM"
          }
            , l = {
            browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], ["name", "version"], [/\s(opr)\/([\w\.]+)/i], [["name", "Opera"], "version"], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i], ["name", "version"], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [["name", "IE"], "version"], [/(edge)\/((\d+)?[\w\.]+)/i], ["name", "version"], [/(yabrowser)\/([\w\.]+)/i], [["name", "Yandex"], "version"], [/(comodo_dragon)\/([\w\.]+)/i], [["name", /_/g, " "], "version"], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(qqbrowser)[\/\s]?([\w\.]+)/i], ["name", "version"], [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /JUC.+(ucweb)[\/\s]?([\w\.]+)/i], [["name", "UCBrowser"], "version"], [/(dolfin)\/([\w\.]+)/i], [["name", "Dolphin"], "version"], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [["name", "Chrome"], "version"], [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i], ["version", ["name", "MIUI Browser"]], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i], ["version", ["name", "Android Browser"]], [/FBAV\/([\w\.]+);/i], ["version", ["name", "Facebook"]], [/fxios\/([\w\.-]+)/i], ["version", ["name", "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], ["version", ["name", "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], ["version", "name"], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], ["name", ["version", d, {
              "1.0": "/8",
              "1.2": "/1",
              "1.3": "/3",
              "2.0": "/412",
              "2.0.2": "/416",
              "2.0.3": "/417",
              "2.0.4": "/419",
              "?": "/"
            }]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], ["name", "version"], [/(navigator|netscape)\/([\w\.-]+)/i], [["name", "Netscape"], "version"], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], ["name", "version"]],
            cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [["architecture", "amd64"]], [/(ia32(?=;))/i], [["architecture", a.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [["architecture", "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [["architecture", "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [["architecture", /ower/, "", a.lowerize]], [/(sun4\w)[;\)]/i], [["architecture", "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [["architecture", a.lowerize]]],
            device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], ["model", "vendor", ["type", "tablet"]], [/applecoremedia\/[\w\.]+ \((ipad)/], ["model", ["vendor", "Apple"], ["type", "tablet"]], [/(apple\s{0,1}tv)/i], [["model", "Apple TV"], ["vendor", "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], ["vendor", "model", ["type", "tablet"]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], ["model", ["vendor", "Amazon"], ["type", "tablet"]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i], [["model", d, {
              "Fire Phone": ["SD", "KF"]
            }], ["vendor", "Amazon"], ["type", "mobile"]], [/\((ip[honed|\s\w*]+);.+(apple)/i], ["model", "vendor", ["type", "mobile"]], [/\((ip[honed|\s\w*]+);/i], ["model", ["vendor", "Apple"], ["type", "mobile"]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], ["vendor", "model", ["type", "mobile"]], [/\(bb10;\s(\w+)/i], ["model", ["vendor", "BlackBerry"], ["type", "mobile"]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i], ["model", ["vendor", "Asus"], ["type", "tablet"]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [["vendor", "Sony"], ["model", "Xperia Tablet"], ["type", "tablet"]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [["vendor", "Sony"], ["model", "Xperia Phone"], ["type", "mobile"]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], ["vendor", "model", ["type", "console"]], [/android.+;\s(shield)\sbuild/i], ["model", ["vendor", "Nvidia"], ["type", "console"]], [/(playstation\s[34portablevi]+)/i], ["model", ["vendor", "Sony"], ["type", "console"]], [/(sprint\s(\w+))/i], [["vendor", d, {
              HTC: "APA",
              Sprint: "Sprint"
            }], ["model", d, {
              "Evo Shift 4G": "7373KT"
            }], ["type", "mobile"]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], ["vendor", "model", ["type", "tablet"]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], ["vendor", ["model", /_/g, " "], ["type", "mobile"]], [/(nexus\s9)/i], ["model", ["vendor", "HTC"], ["type", "tablet"]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], ["model", ["vendor", "Microsoft"], ["type", "console"]], [/(kin\.[onetw]{3})/i], [["model", /\./g, " "], ["vendor", "Microsoft"], ["type", "mobile"]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s[6])/i], ["model", ["vendor", "Motorola"], ["type", "mobile"]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], ["model", ["vendor", "Motorola"], ["type", "tablet"]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [["vendor", "Samsung"], "model", ["type", "tablet"]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [["vendor", "Samsung"], "model", ["type", "mobile"]], [/(samsung);smarttv/i], ["vendor", "model", ["type", "smarttv"]], [/\(dtv[\);].+(aquos)/i], ["model", ["vendor", "Sharp"], ["type", "smarttv"]], [/sie-(\w+)*/i], ["model", ["vendor", "Siemens"], ["type", "mobile"]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [["vendor", "Nokia"], "model", ["type", "mobile"]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], ["model", ["vendor", "Acer"], ["type", "tablet"]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [["vendor", "LG"], "model", ["type", "tablet"]], [/(lg) netcast\.tv/i], ["vendor", "model", ["type", "smarttv"]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i], ["model", ["vendor", "LG"], ["type", "mobile"]], [/android.+(ideatab[a-z0-9\-\s]+)/i], ["model", ["vendor", "Lenovo"], ["type", "tablet"]], [/linux;.+((jolla));/i], ["vendor", "model", ["type", "mobile"]], [/((pebble))app\/[\d\.]+\s/i], ["vendor", "model", ["type", "wearable"]], [/android.+;\s(glass)\s\d/i], ["model", ["vendor", "Google"], ["type", "wearable"]], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i], [["model", /_/g, " "], ["vendor", "Xiaomi"], ["type", "mobile"]], [/\s(tablet)[;\/\s]/i, /\s(mobile)[;\/\s]/i], [["type", a.lowerize], "vendor", "model"]],
            engine: [[/windows.+\sedge\/([\w\.]+)/i], ["version", ["name", "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], ["name", "version"], [/rv\:([\w\.]+).*(gecko)/i], ["version", "name"]],
            os: [[/microsoft\s(windows)\s(vista|xp)/i], ["name", "version"], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], ["name", ["version", d, c]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [["name", "Windows"], ["version", d, c]], [/\((bb)(10);/i], [["name", "BlackBerry"], "version"], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i], ["name", "version"], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [["name", "Symbian"], "version"], [/\((series40);/i], ["name"], [/mozilla.+\(mobile;.+gecko.+firefox/i], [["name", "Firefox OS"], "version"], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], ["name", "version"], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [["name", "Chromium OS"], "version"], [/(sunos)\s?([\w\.]+\d)*/i], [["name", "Solaris"], "version"], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], ["name", "version"], [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i], [["name", "iOS"], ["version", /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i], [["name", "Mac OS"], ["version", /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i], ["name", "version"]]
          }
            , m = function(b, c) {
            if (!(this instanceof m))
              return (new m(b,c)).getResult();
            var d = b || (e && e.navigator && e.navigator.userAgent ? e.navigator.userAgent : "")
              , f = c ? a.extend(l, c) : l;
            this.getBrowser = function() {
              var b = g.apply(this, f.browser);
              b.major = a.major(b.version);
              return b
            }
            ;
            this.getCPU = function() {
              return g.apply(this, f.cpu)
            }
            ;
            this.getDevice = function() {
              return g.apply(this, f.device)
            }
            ;
            this.getEngine = function() {
              return g.apply(this, f.engine)
            }
            ;
            this.getOS = function() {
              return g.apply(this, f.os)
            }
            ;
            this.getResult = function() {
              return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU()
              }
            }
            ;
            this.getUA = function() {
              return d
            }
            ;
            this.setUA = function(a) {
              d = a;
              return this
            }
            ;
            this.setUA(d);
            return this
          };
          m.VERSION = "0.7.10";
          m.BROWSER = {
            NAME: "name",
            MAJOR: "major",
            VERSION: "version"
          };
          m.CPU = {
            ARCHITECTURE: "architecture"
          };
          m.DEVICE = {
            MODEL: "model",
            VENDOR: "vendor",
            TYPE: "type",
            CONSOLE: "console",
            MOBILE: "mobile",
            SMARTTV: "smarttv",
            TABLET: "tablet",
            WEARABLE: "wearable",
            EMBEDDED: "embedded"
          };
          m.ENGINE = {
            NAME: "name",
            VERSION: "version"
          };
          m.OS = {
            NAME: "name",
            VERSION: "version"
          };
          "undefined" !== typeof h ? ("undefined" !== typeof f && f.exports && (h = f.exports = m),
            h.UAParser = m) : e.UAParser = m;
          var n = e.jQuery || e.Zepto;
          if ("undefined" !== typeof n) {
            var p = new m;
            n.ua = p.getResult();
            n.ua.get = function() {
              return p.getUA()
            }
            ;
            n.ua.set = function(a) {
              p.setUA(a);
              a = p.getResult();
              for (var b in a)
                n.ua[b] = a[b]
            }
          }
        }
      )("object" === typeof window ? window : this)
    }
      , {}],
    7: [function(c, f, h) {
      f.exports = function(b) {
        for (var a = 1; a < arguments.length; a++) {
          var c = arguments[a], d;
          for (d in c)
            e.call(c, d) && (b[d] = c[d])
        }
        return b
      }
      ;
      var e = Object.prototype.hasOwnProperty
    }
      , {}]
  }, {}, [1])(1)
});
