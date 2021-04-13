/* Html5 Player v2.0 skin of Youtube and create by Jolly Ut | fb.com/trichruiphe */
"use strict";
(function () {

    var A = {error: 'text-danger', done: 'text-success'};

    var regexYTB = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'<> #]+)/gmi,
        regexFB = /^https?:\/\/www\.facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/gm;
    
    var el = ['ut-p-autohide', 'aria-hidden', 'ut-ghh', 'ut-sf', 'aria-disabled', 'ut-p-button', 'ut-p-volume-control', '-hover', 'ut-p-bottom', 'aria-label', 'ut-p-big-mode', 'aria-expanded', 'ut-p-menuitem', 'ut-p-menuitem-label', 'ut-p-panel-animating', '.ut-p-panel', 'ut-p-panel-title', 'aria-checked', 'ut-p-hd-quality-badge'],
        ev = ['mousemove', 'mouseout', 'mousedown', 'mouseup', 'volumechange', 'timeupdate', 'progress', 'resize', 'keyup', 'click', 'dblclick'];

    var setting = {
        name: "",
        prev: false,
        next: false,
        autoPlay: false,
        autoNext: false,
        sub: false,
        mess: false,
        quality: 720,
        lang: {
            sub: 'Phụ đề',
            set: 'Cài đặt',
            ful: 'Toàn màn hình',
            cful: 'Thoát khỏi chế độ toàn màn hình',
            volon: 'Bật âm thanh',
            voloff: 'Tắt tiếng',
            mess: 'Tin nhắn',
            atn: 'Tự động phát',
            speed: 'Tốc độ',
            standard: 'Chuẩn',
            quality: 'Chất lượng'
        }
    };

    var lan = setting.lang;

    function JollyUt() {
        A.a = E(['', {
            class: 'html5-video-player ' + (setting.autoPlay ? el[0] : '')
        }]);
        var a = document.getElementById('player-api');
        a.appendChild(A.a);
        A.g = true;
        Hv(A.a);
        return L(B(A.a));
    }

    function fillterQuality(qua) {
        return;

        return dataVideo.items.filter( e => {
            return e.height == qua
        });
    }

    function B(z) {
        A.v = E(['video', {
            class: 'video-stream'
        }]);

        A.au = E(['audio', {
            class: 'audio'
        }]);

        A.b = E(['', {
            class: 'html5-video-container'
        }, A.v]);

        A.spin = E(['i', {class: 'fa fa-spinner fa-spin'}]);
        A.skull = E(['i', {class: 'fas fa-skull'}]);
        A.check = E(['i', {class: 'fas fa-check'}]);
        A.isP = true;
        C(z.appendChild(A.b));
        D();

        if(dataVideo.sound) A.au.src = dataVideo.sound;

        if (setting.autoPlay) {A.v.play(); A.au.play()};
        A.v.width = Math.ceil($(A.a).width());
        A.v.height = A.a.clientHeight;
        A.TM = urlParams('t');
        if (A.TM) {A.au.currentTime = A.v.currentTime = A.TM};
        var lo = localStorage.quality,
            quality =  lo || setting.quality;
        if(typeof lo !== "undefined") setting.quality = lo;
        A.v.src = dataVideo.src;
        //$.post(baseUrl('anime/getEpisode'), function(result) {
            //dataVideo.items = result.items;
            //A.v.src = fillterQuality(quality)[0].link;
            if(A.TM) Yj(),$(A.p).show();
        //});
        return z;
    }


    function Thumbnail() {

        A.Tb = E(['', { class : 'ut-p-thumbnail'} , ['', {class : 'ut-p-thumbnail-overlay-image', 'style' : `background-image:url(${dataVideo.thumbnail})`}]]);

        d(A.Tb, ev[9], function() {
            var that = this;
            $(this).attr(el[1],true);

            setTimeout(() =>  {

                $(that).removeAttr(el[1]);
                $(that).hide();
                $(A.p).show();
                Yj();

            },200);
        });

        return A.Tb;
    }

    function Yj() {
        Pl(A.isP, '<path class="ut-p-svg-fill" d="m 12.22,28.88 0,-17.77 16.66,8.91 -16.66,8.86 z"></path>');
        A.v.play();
        A.au.play();
        A.isP = false;
    }

    function C(a) {
        d(a, ev[9], () => {
            if (A.Q || A.Cf) return false;
            if (A.v.paused) {
                Yj();
            } else {
                Pl(false, '<path class="ut-p-svg-fill" d="m 12.22,11.11 0,17.77 6.66,0 0,-17.77 -6.66,0 z m 10,0 0,17.77 6.66,0 0,-17.77 -6.66,0 z"></path>');
                A.isP = false;
                A.v.pause();
                A.au.pause();
            }
        });
    }

    function Hv(a) {
        A.HV = null;
        d(a, ev[0], () => {
            A.h = true;
            if (!A.v.paused && A.g && !A.Cf)  P();
        });
        O(a);
    }

    function O(g) {
        d(g, ev[1],() => {
            A.h = false;
            if (!A.v.paused && A.g && !A.Cf) {
                clearTimeout(A.HV);
                A.a.classList.add(el[0]);
            }
        });
    }

    function L(b) {
        // var a = '<span class="ut-p-spinner-svg">
        //             <svg height="100%" version="1.1" viewBox="0 0 22 22" width="100%">
        //                 <svg x="7" y="1">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-0" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //                 <svg x="11" y="3">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-1" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //                 <svg x="13" y="7">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-2" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //                 <svg x="11" y="11">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-3" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //                 <svg x="7" y="13">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-4" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //                 <svg x="3" y="11">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-5" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //                 <svg x="1" y="7">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-6" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //                 <svg x="3" y="3">
        //                     <circle class="ut-p-spinner-dot ut-p-spinner-dot-7" cx="4" cy="4" r="2"></circle>
        //                 </svg>
        //             </svg>
        //         </span>
        //         <div class="ut-p-spinner-message" style="/* display: none; */">Nếu phát lại không bắt đầu ngay, hãy thử khởi động lại thiết bị của bạn.</div>';

        var xy = [[7,1],[11,3],[13,7],[11,11],[7,13],[3,11],[1,7],[3,3]],
            dm = ['svg', {height:'100%', version:'1.1', viewBox:'0 0 22 22', width:'100%'}];
        
        for(var i = 0; i < 8; i ++)
        {
            var el = E(['svg',{x : xy[i][0], y : xy[i][1]},E(['circle', {class : 'ut-p-spinner-dot ut-p-spinner-dot-'+i,cx : 4, cy: 4, r:2}], true)], true);
            dm.push(el);
        }

        var uh = ['span', {class : 'ut-p-spinner-svg'}, E(dm, true)];

        A.l = E(['', {
            class: 'ut-p-spinner'
        }, uh]);
        
        $(Q(b, $(A.l))).append($(A.l).hide());
        F($(A.l));
        
        if(!A.TM)
            $(A.a).append(Thumbnail());

        return b;
    }

    function Q(e, k) {
        d(A.v, 'canplaythrough', () => {
            if(!A.v.paused) A.au.play();
            k.fadeOut(150);

        });
        d(A.v, 'waiting', () => {
            A.au.pause();
            k.show();
        }, false);
        return e;
    }

    function P() {
        if(A.Cf) return false;
        A.a.classList.remove(el[0]);
        clearTimeout(A.HV);
        A.HV = setTimeout(() => {
            A.a.classList.add(el[0]);
            A.h = false;
        }, 3000);
    }

    function sT(a) {
        $(a).click(e => {
            e.stopPropagation();
        });
    }

    function F(h) {
        A.N = E(['', {
            class: 'ut-p-scrubber-button ut-p-swatch-background-color'
        }]);
        A.O = E(['', {
            class: 'ut-p-progress-bar',
            'aria-valuemin': A.v.currentTime
        },
            ['', {
                class: 'ut-p-progress-bar-padding'
            }], A.N
        ]);
        A.p = E(['', {
            class: 'ut-p-chrome-bottom'
        },
            ['', {
                class: 'ut-p-progress-bar-container'
            }, A.O]
        ]);

        var titleHeader = E(['', {class : 'ut-p-chrome-top'}, ['', {class : 'ut-p-title'}, ['', {class: 'ut-p-title-text'}, ['a', {class: 'ut-p-title-link', href : location.href}, ['span:'+dataVideo.title,{class:'ut-CurEp'}]]]]]);
        $(A.a).append(E(['', {
            class: 'ut-p-gradient-top'
        }]), titleHeader , E(['', {
            class: 'ut-p-gradient-bottom'
        }]), A.p);

        setInterval(function () {
            if (A.h) {
                var c = A.v.currentTime,
                    d = A.v.duration;
                $(A.O).attr({
                    'aria-valuemax': Math.floor(d),
                    'aria-valuenow': Math.floor(c),
                    'aria-valuetext': T(c) + ' / ' + T(d)
                });
            }
        }, 100);
        Th([A.p, {
            class: 'ut-p-prev-button ' + el[5],
            'aria-disabled': (!setting.prev ? true : false)
        }, '<path d="M19.8,12.5 L19.8,16.49 L27,12.5 L27,23.5 L19.8,19.50 L19.8,23.5 L11.5,19.1 L11.5,23.5 L9,23.5 L9,12.5 L11.5,12.5 L11.5,17.45 L19.8,12.5 Z" id="ut-p-svg-37"></path>'], true, (!setting.prev ? true : false), 37);
        Th([A.n, {
            class: 'ut-p-next-button ' + el[5],
            'aria-disabled': (!setting.next ? true : false)
        }, '<path d="M16.2,12.5 L16.2,16.49 L9,12.5 L9,23.5 L16.2,19.50 L16.2,23.5 L24.5,19.1 L24.5,23.5 L27,23.5 L27,12.5 L24.5,12.5 L24.5,17.45 L16.2,12.5 Z" id="ut-p-svg-32"></path>'], false, (!setting.next ? true : false), 32);
        A.f = false;
        Vl(A.lc);
        Zz(A.p, A.f);
        RE(Gr(A.O));
        Io(A.tt, A.hw);
    }

    function Ju(a) {
        return '<svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" viewBox="0 0 36 36" width="100%">' + a + '</svg>';
    }

    function Zz(g, f) {
        var a = (!A.f ? 24 : 48);
        return $(g).css({
            left: Ej(),
            width: $(A.a).width() - a
        });
    }

    function Th(a, v, f, s) {
        a[0] = E(['a', a[1]]);
        $(a[0]).append(Ju('<defs>' + a[2] + '</defs><use class="ut-p-svg-shadow" xlink:href="#ut-p-svg-' + s + '"></use><use class="ut-p-svg-fill" xlink:href="#ut-p-svg-' + s + '"></use>'));
        if (f) $(a[0]).hide();
        if (v) {
            A.ps = E(['button', {
                class: 'ut-p-play-button ' + el[5]
            }]);
            A.lc = E(['', {
                class: 'ut-p-left-controls'
            }, a[0], A.ps]);
            A.cy = E(['', {
                class: 'ut-p-right-controls'
            }]);
            A.cc = E(['', {
                class: 'ut-p-chrome-controls'
            }, A.lc, A.cy]);
            A.p.appendChild(A.cc);
            Fe(A.ps);
            Fa(A.cy);
            SetIconPlay(setting.autoPlay);
        } else {
            A.lc.appendChild(a[0]);
        }
    }

    function SetIconPlay(x) {
        var ct = (x ? '<svg width="100%" height="100%" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="ut-p-10" d="M 11 10 L 17 10 L 17 26 L 11 26 Z M 20 10 L 26 10 L 26 26 L 20 26 Z"></path></defs><use xlink:href="#ut-p-10" class="ut-p-svg-shadow"></use><use xlink:href="#ut-p-10" class="ut-p-svg-fill"></use></svg>' : '<svg width="100%" height="100%" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="ut-p-10" d="M 11 10 L 18 13.74 L 18 22.28 L 11 26 Z M 18 13.74 L 26 18 L 26 18 L 18 22.28 Z"></path></defs><use xlink:href="#ut-p-10" class="ut-p-svg-shadow"></use><use xlink:href="#ut-p-10" class="ut-p-svg-fill"></use></svg>');
        $(A.ps).html(ct);
    }

    function R(p, f, e, y) {
        d(A.v, ev[5], () => {
            if (A.h) {
                Dz(p);
                $(A.N).css({
                    left: Ef()
                });
                E9(A.r, U2());
            }
        });
        Fu(A.lc);
        eQ(y);
    }

    function Dz(e) {
        A.D2 = 1 / A.v.duration * A.v.currentTime;
        return $(e).css({
            transform: `scaleX(${A.D2})`
        });
    }

    function RE(h) {
        A.Te = E(['', {
            class: 'ut-p-play-progress ut-p-swatch-background-color'
        }]);
        A.Lg = E(['', {
            class: 'ut-p-load-progress'
        }]);
        A.w = E(['', {
            class: 'ut-p-hover-progress'
        }]);
        A.C = E(['', {
            class: 'ut-p-progress-list'
        }, A.Te, A.Lg, A.w]);
        h.appendChild(A.C);
        R(A.Te, A.Tg, A.w, A.Lg);
        fw(A.C.parentElement);
    }

    function eQ(p) {
        d(A.v, ev[6], () => {
            A.v.onprogress = () => {
                if (A.v.readyState === 4){
                    var l = 1 / A.v.duration * A.v.buffered.end(A.v.buffered.length - 1);
                    $(A.Lg).css({ transform: 'scaleX(' + l + ')' });
                }
            }
        });
    }

    function urlParams(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

    function TQ(a) {
        var w = $('body').width(),
            b = w - $(A.a).width();
        if (a) {
            return b / 2;
        } else {
            return w - b - Ej() * 2;
        }
    }

    function Ej() {
        return (!A.f ? 12 : 24);
    }

    function rT() {
        clearTimeout(A.HV);
        A.a.classList.remove(el[0]);
    }

    function D() {
        var h = true;
        d(A.v, 'play', () => {
            A.au.play();
            if (h && setting.autoPlay) { h = false; return false; }
            P();
            setTimeout(() => {
                $(A.ps).html('<svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ut-p-svg-shadow" xlink:href="#ut-p-svg-transition-2"></use><path class="ut-p-svg-fill" d="M 11,26 15.33,26 15.33,10 11,10 z M 19.66,26 24,26 24,10 19.66,10 z" id="ut-p-svg-transition-2"></path></svg>');
            }, 10)
        });
        G();
    }

    function Vl(s) {
        var f = getCookie('UT_VL').split(',');
        A.bl = E(['button', {
            class: 'ut-p-mute-button ' + el[5]
        }]);
        A.rl = E(['', {
            class: 'ut-p-volume-slider-track'
        }]);
        A.rx = E(['', {
            class: 'ut-p-volume-slider-handle'
        }]);
        A.vr = E(['', {
            class: 'ut-p-volume-panel'
        },
            ['', {
                class: 'ut-p-volume-slider'
            }, A.rl, A.rx]
        ]);
        A.vl = E(['', {
            class: el[6]
        }, A.bl, A.vr]);
        Rg(A.vl, A.vr);
        s.appendChild(A.vl);
        Dv(A.bl, f);
        return s;
    }

    function Fu(v) {
        A.tu = E(['span', {
            class: 'ut-p-time-current'
        }]);
        A.DR = E(['span', {
            class: 'ut-p-time-duration'
        }]);

        var f = E(['span', {
                class: 'ut-p-time-separator'
            }]),
            a = E(['', {
                class: 'ut-p-time-display'
            }, A.tu, f, A.DR]);
        A.tu.innerHTML = A.DR.innerHTML = '0:00';
        f.innerHTML = ' / ';
        v.appendChild(a);
        setInterval(() => {
            if (!A.h) return false;
            A.tu.innerHTML = T(A.v.currentTime);
            if(T(A.v.duration) !== '0:00') A.DR.innerHTML = T(A.v.duration);
        }, 100);
    }

    function UpdateTime() {
        A.tu.innerHTML = T(A.v.currentTime);
        Dz(A.Te);
        $(A.N).css({
            left: Ef()
        });
        E9(A.r, U2());
    }

    function G() {
        d(A.v, 'pause',() => {
            rT();
            A.au.pause();
            setTimeout(() => {
                $(A.ps).html('<svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ut-p-svg-shadow" xlink:href="#ut-p-svg-transition-2"></use><path class="ut-p-svg-fill" d="M 11,26 17.5,22 17.5,14 11,10 z M 17.5,22 24,18 24,18 17.5,14 z" id="ut-p-svg-transition-2"></path></svg>');
            }, 10);
        });
        Z();
    }

    function Dv(v, z) {
        A.au.muted = A.v.muted = (z[0] == 1 ? true : false);
        A.au.volume = A.v.volume = z[1] || 1;
        Rv(z[1] || 1);
        Po(v);
        $(v).click(() => {
            if (A.v.muted) {
                A.hw.innerHTML = lan.volon;
            } else {
                A.hw.innerHTML = lan.voloff;
            }
        });
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function Z() {
        d(A.v, 'ended',() => {
            console.log('phát xong');
            UpdateTime();
        });
        Tp();
    }

    function Io(z, k) {
        var t = $(z);
        $(A.p).find('[aria-label]').hover(function(e) {
            if (A.Cf) return false;
            var a = $(this).offset().left,
                b = $(this).attr(el[9]);
            k.innerHTML = b;
            t.show().addClass(el[8]).attr(el[1], true);
            var c = t.width();
            var d = a - $(A.a).offset().left - c / 2 + $(this).width() / 2;
            if (d < Ej()) d = Ej();
            if (d > $(A.a).width() - Ej() - c) d = $(A.a).width() - c - Ej();
            t.css({
                left: d
            });
            setTimeout( () => {
                t.removeAttr(el[1]);
            }, 200);
        },() => {
            t.removeAttr('style');
        });
    }

    function ShowAnimateSlow(lm) {
        var a = lm.length;
        for (var i = 0; i < a; i++) {
            $(lm[i]).attr(el[1], true).show();
        }
    }

    function HideAnimateSlow(lm) {
        var a = lm.length;
        for (var i = 0; i < a; i++) {
            $(lm[i]).removeAttr(el[1]);
        }
    }

    function fw(f) {
        $(f).hover(() => {
            A.ht = true;
            AriaHidden([A.N, A.tt], 100);
            if (A.u) return false;
            A.g = A.i = false;
            rT();
            if (A.Cf) return false;
            $(A.tt).addClass(el[8]).show();
        }, Hd);

        $('.' + el[5]).hover(() => {
            A.g = false;
            A.ht = true;
            rT();
        }, function () {
            A.g = true;
            A.ht = false;
        });
        Zs();
    }

    function Hd(c) {
        A.ht = false;
        $(A.tt).removeClass('ut-p-bottom ut-p-preview').removeAttr('style');
        if (A.u) return false;
        A.g = A.i = true;
        AriaHidden([A.N], 150,() => {
            $(A.N).hide();
        })
    }

    function Tp() {
        A.hw = E(['', {
            class: 'ut-p-tooltip-text'
        }]);
        A.ImHover = E(['',{
                class : 'ut-p-tooltip-bg'
            }]);
        A.tt = E(['', {
            class: 'ut-p-tooltip'
        },
            A.ImHover,
            ['', {
                class: 'ut-p-tooltip-text-wrapper'
            }, A.hw]
        ]);
        A.a.appendChild(A.tt);
    }

    function T(a, c) {
        c = c || a;
        var d = Math.floor(a % 60),
            e = Math.floor(a / 60 % 60),
            g = Math.floor(a / 3600),
            h = Math.floor(c / 60 % 60),
            j = Math.floor(c / 3600);
        if (isNaN(a) || Infinity === a) g = e = d = "0";
        g = 0 < g || 0 < j ? g + ":" : "";
        return g + (((g || 10 <= h) && 10 > e ? "0" + e : e) + ":") + (10 > d ? "0" + d : d)
    }

    function Rg(e, t) {
        A.c = false;
        var a = el[6] + el[7]
        $(e).hover(function() {
            A.ee = true;
            $(this).addClass(a);
        },function() {
            A.ee = false;
            if (!A.c) $(this).removeClass(a);
        })

        d(t, ev[2],g => {
            A.c = true;
            Ce(g);
            A.au.muted = A.v.muted = false;
        });
        Rl();
    }

    function Rl() {
        d(A.v, ev[4], e => {
            Rv(A.v.volume,e);
            setCookie('UT_VL', (A.v.muted ? 1 : 2) + ',' + A.v.volume, 3);
        });
    }

    function Rv(a, event) {
        var b = (!A.f ? 48 : 72);
        $(A.bl).attr(el[9], lan.voloff);
        if (A.v.muted || a == 0) {
            $(A.bl).attr(el[9], lan.volon);
            A.bl.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="ut-p-svg-shadow" d="M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z" opacity="1"></path><path class="ut-p-svg-fill" d="M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z" opacity="1"></path><path class="ut-p-svg-shadow" d="M19.63,15.92 L20.68,14.93 L22.81,16.94 L24.94,14.93 L26,15.92 L23.86,17.93 L26,19.93 L24.94,20.92 L22.81,18.92 L20.68,20.92 L19.63,19.93 L21.76,17.93 L19.63,15.92 Z" opacity="1"></path><path class="ut-p-svg-fill" d="M19.63,15.92 L20.68,14.93 L22.81,16.94 L24.94,14.93 L26,15.92 L23.86,17.93 L26,19.93 L24.94,20.92 L22.81,18.92 L20.68,20.92 L19.63,19.93 L21.76,17.93 L19.63,15.92 Z" opacity="1"></path></svg>';
            b = 0;
        } else if (a <= 0.5 && a !== 0) {
            A.bl.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="ut-p-svg-shadow" d="M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z" opacity="1"></path><path class="ut-p-svg-fill" d="M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z" opacity="1"></path><path class="ut-p-svg-shadow" d="M22,17.99 C22,16.4 20.74,15.05 19,14.54 L19,21.44 C20.74,20.93 22,19.59 22,17.99 Z" opacity="1"></path><path class="ut-p-svg-fill" d="M22,17.99 C22,16.4 20.74,15.05 19,14.54 L19,21.44 C20.74,20.93 22,19.59 22,17.99 Z" opacity="1"></path></svg>';
        } else if (a > 0.5) {
            A.bl.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="ut-p-svg-shadow" d="M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z" opacity="1"></path><path class="ut-p-svg-fill" d="M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z" opacity="1"></path><path class="ut-p-svg-shadow" d="M22,17.99 C22,16.4 20.74,15.05 19,14.54 L19,21.44 C20.74,20.93 22,19.59 22,17.99 Z" opacity="1"></path><path class="ut-p-svg-fill" d="M22,17.99 C22,16.4 20.74,15.05 19,14.54 L19,21.44 C20.74,20.93 22,19.59 22,17.99 Z" opacity="1"></path><path class="ut-p-svg-shadow" d="M19,24.31 L19,26 C22.99,25.24 26,21.94 26,18 C26,14.05 22.99,10.75 19,10 L19,11.68 C22.01,12.41 24.24,14.84 24.24,18 C24.24,21.15 22.01,23.58 19,24.31 Z" opacity="1"></path><path class="ut-p-svg-fill" d="M19,24.31 L19,26 C22.99,25.24 26,21.94 26,18 C26,14.05 22.99,10.75 19,10 L19,11.68 C22.01,12.41 24.24,14.84 24.24,18 C24.24,21.15 22.01,23.58 19,24.31 Z" opacity="1"></path></svg>';
        }
        $(A.rl).css({
            width: a * b
        });
        $(A.rx).css({
            left: a * b
        });
    }

    function Po(a) {
        d(a, ev[9],() => {
            if (A.Cf) return false;
            if (A.v.muted) {
                A.t = true;
                A.au.muted = A.v.muted = false;
            } else {
                A.t = false;
                A.au.muted = A.v.muted = true;
            }
        });
    }

    function Ce(e) {
        var a = $(A.bl).offset().left;
        var b = Math.floor(e.clientX - a - $(A.bl).width());
        var c = 1 / (!A.f ? 52 : 78) * b;
        if (c > 1 || c < 0) return false;
        A.au.muted = A.v.muted = false;
        if (c == 0) A.au.muted = A.v.muted = true; 
        A.au.volume = A.v.volume = c;
    }

    function Os() {
        return $(A.a).offset().left;
    }

    function Zs() {
        A.u = false;
        d(A.O, ev[2], function(e) {
            A.u = true;
            FF(e);
            this.classList.add('ut-nhd');
        });

        d(A.O, ev[0], e => {
            if (A.Cf) return false;
            var g = e.clientX - Os(),
                c,
                d = $(A.tt).width(),
                o = g - d / 2,
                f = A.v.duration * (g - Ej()) / TQ();

            if (o < Ej()) {
                c = Ej();
            } else if (o > $(A.a).width() - Ej() - d) {
                c = $(A.a).width() - d - Ej();
            } else {
                c = o;
            }
            if (f < 0 || f > A.v.duration) return false;
            $(A.tt).css({
                left: c
            });
            
            if(dataVideo.hover !== undefined)
            {
                $(A.tt).addClass('ut-p-preview');
                var s = (A.f ? '720px 405px' : '480px 270px'),
                    j = (A.f ? [216,122] : [144,81]),
                    x = (Math.floor(f/2) - Math.floor(f/2/5)*5) * j[0] *-1,
                    y = Math.floor(f/2/5) * j[1] *-1;
                $(A.ImHover).css({
                    background : `url(/images/thumbnails/${dataVideo.id}/${Math.floor(f)}.png)`
                })
            }
            
            A.hw.innerHTML = T(f);
        });

        d(document.body, ev[0], e => {
            if (A.u) {
                FF(e);
                $(A.N).show();
            }
            if (A.c) {
                Ce(e);
            }
        });
        d(document.body, ev[3], e => {
            if (!A.ht && !A.v.paused && A.u) A.a.classList.add(el[0]);
            A.u = A.c = false;
            A.O.classList.remove('ut-nhd');
            if (!A.ht) Hd();
            if (!A.ee) $(A.vl).removeClass(el[6] + el[7]);
        })
    }

    function d(a, b, c, e) {
        return a.addEventListener(b, c, e);
    };

    function FF(e) {
        var a = e.clientX - (Os() + Ej()),
            c = 1 / TQ() * a;
        if (c > 1 || c < 0) return false;
        A.D2 = c;
        $(A.Te).css({
            transform: 'scaleX(' + c + ')'
        });
        $(A.N).css({
            left: a
        });
        if (A.v.duration) {
            A.au.currentTime = A.v.currentTime = A.v.duration * (a / TQ());
        }
        E9(A.r, U2());
    }

    function Fe(f) {
        d(f, ev[9],() => {
            if (A.Cf) return false;
            if(A.v.paused) {
                A.v.play();
                A.au.play()
            } else {
                A.v.pause();
                A.au.pause()
            }
        });
    }

    function Pl(a, b) {
        if (a || setting.autoPlay) {
            setting.autoPlay = false;
            var s = '<svg height="100%" version="1.1" viewBox="0 0 40 40" width="100%"></svg>';
            A.bz = E(['', {
                class: 'ut-p-bezel'
            },
                ['', {
                    class: 'ut-p-bezel-icon'
                },
                    [null, s]
                ]
            ]);
            A.a.appendChild(A.bz);
        }
        $(A.bz).show().find('svg').html(b);
        setTimeout(() => {
            A.bz.setAttribute(el[1], true);
        }, 10);
        setTimeout(() => {
            A.bz.removeAttribute(el[1], true);
            $(A.bz).hide();
        }, 475);
    }

    /* function E() => create Element
     * ex:(1) ["jollyut",{name:"thanh tung"}] => <jollyut name="thanh tung"></jollyut>
     * ["jollyut",{name:"thanh tung"},[...any]]
     */
    function E(a, t) {
        if (a[0] == undefined) return a;
        var sl = a.length,
            b = a[0].split(':'),
            t = t || false,
            el = (t ? document.createElementNS('http://www.w3.org/2000/svg', b[0]) : document.createElement(b[0] || 'div'));
        l(a[1], (c, d) => {
            el.setAttribute(c, d);
            if (b[1]) el.textContent = b[1];
        });
        if (sl >= 3) {
            for (var i = 2; i < sl; i++) {
                $(el).append(E(a[i]));
            }
        }
        return el;
    }

    function Rs() {
        Zz(A.p, A.f, true);
        Rv(A.v.volume);
        var w = $(A.a).width(),
            h = A.a.clientHeight;
        $(A.v).width(Math.ceil(w));
        A.v.height = h;
        $(A.N).css({
            left: Ef()
        });
    }

    function Wbt() {
        return $(A.a).width() - Ej() * 2;
    }

    function U2() {
        return A.D2 * Wbt();
    }

    function Gr(h) {
        d(h, ev[0], e => {
            A.r = e.clientX;
            E9(A.r, U2());
        });
        d(h, ev[1],() => {
            $(A.w).removeClass('ut-ghh');
        });
        return h;
    }

    function E9(v, c) {
        if (!A.i) {
            var f = 1 / TQ() * (v - c - (Os() + Ej()));
            if (f < 0) $(A.w).removeClass(el[3]);
            if (f > 0) $(A.w).addClass(el[3]);
            $(A.w).addClass('ut-ghh').css({
                left: U2(),
                transform: 'scaleX(' + f + ')'
            });
        }
    }

    function l(a, b) {
        for (var k in a) {
            b.call(this, k, a[k])
        }
    }

    function Ef() {
        return A.v.currentTime * (TQ() / A.v.duration);
    }

    function Fa(d) {
        A.sb = E(['button', {
            class: 'ut-p-subtitles-button ' + el[5]
        }]);
        $(A.sb).attr(el[9], lan.sub);
        A.sb.innerHTML = Ju('<defs><path d="M25,19 L25,18 L11,18 L11,19 L25,19 Z M24,21 L24,22 L12,22 L12,21 L24,21 Z M27,12 L27,24 L9,24 L9,12 L27,12 Z" fill-rule="evenodd" id="ut-p-svg-46"></path></defs><use class="ut-p-svg-shadow" xlink:href="#ut-p-svg-46"></use><use class="ut-p-svg-fill" xlink:href="#ut-p-svg-46"></use>');
        d.appendChild(A.sb);
        if (!setting.sub) $(A.sb).hide();
        St(d);
    }

    function St(k) {
        var u = { class: 'ut-p-settings-button ' + el[5] }
        if(setting.quality >= 720) u.class += (' ' + el[18]);
        A.ST = E(['button', u]);
        $(A.ST).attr({
            'aria-label': lan.set,
            'aria-expanded': false
        });
        A.ST.innerHTML = Ju('<defs><path d="M27,19.35 L27,16.65 L24.61,16.65 C24.44,15.79 24.10,14.99 23.63,14.28 L25.31,12.60 L23.40,10.69 L21.72,12.37 C21.01,11.90 20.21,11.56 19.35,11.38 L19.35,9 L16.65,9 L16.65,11.38 C15.78,11.56 14.98,11.90 14.27,12.37 L12.59,10.69 L10.68,12.60 L12.36,14.28 C11.89,14.99 11.55,15.79 11.38,16.65 L9,16.65 L9,19.35 L11.38,19.35 C11.56,20.21 11.90,21.01 12.37,21.72 L10.68,23.41 L12.59,25.32 L14.28,23.63 C14.99,24.1 15.79,24.44 16.65,24.61 L16.65,27 L19.35,27 L19.35,24.61 C20.21,24.44 21.00,24.1 21.71,23.63 L23.40,25.32 L25.31,23.41 L23.62,21.72 C24.09,21.01 24.43,20.21 24.61,19.35 L27,19.35 Z M18,22.05 C15.76,22.05 13.95,20.23 13.95,18 C13.95,15.76 15.76,13.95 18,13.95 C20.23,13.95 22.05,15.76 22.05,18 C22.05,20.23 20.23,22.05 18,22.05 L18,22.05 Z" id="ut-p-svg-40"></path></defs><use class="ut-p-svg-shadow" xlink:href="#ut-p-svg-40"></use><use class="ut-p-svg-fill" xlink:href="#ut-p-svg-40"></use>');
        k.appendChild(A.ST);
        Yt(A.ST, el[11]);
        Qe(k);
    }

    function Qe(u) {
        A.FT = E(['button', {
            class: 'ut-p-fullscreen-button ' + el[5]
        }]);
        $(A.FT).attr(el[9], lan.ful);
        A.ft = '<defs><path d="M7,16 L10,16 L10,13 L13,13 L13,10 L7,10 L7,16 Z" id="ut-p-svg-12"></path><path d="M23,10 L23,13 L26,13 L26,16 L29,16 L29,10 L23,10 Z" id="ut-p-svg-13"></path><path d="M23,23 L23,26 L29,26 L29,20 L26,20 L26,23 L23,23 Z" id="ut-p-svg-14"></path><path d="M10,20 L7,20 L7,26 L13,26 L13,23 L10,23 L10,20 Z" id="ut-p-svg-15"></path></defs><use class="ut-p-svg-shadow ut-p-fullscreen-button-corner-0" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-12"></use><use class="ut-p-svg-shadow ut-p-fullscreen-button-corner-1" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-13"></use><use class="ut-p-svg-shadow ut-p-fullscreen-button-corner-2" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-14"></use><use class="ut-p-svg-shadow ut-p-fullscreen-button-corner-3" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-15"></use><use class="ut-p-svg-fill ut-p-fullscreen-button-corner-0" fill="#fff" xlink:href="#ut-p-svg-12"></use><use class="ut-p-svg-fill ut-p-fullscreen-button-corner-1" fill="#fff" xlink:href="#ut-p-svg-13"></use><use class="ut-p-svg-fill ut-p-fullscreen-button-corner-2" fill="#fff" xlink:href="#ut-p-svg-14"></use><use class="ut-p-svg-fill ut-p-fullscreen-button-corner-3" fill="#fff" xlink:href="#ut-p-svg-15"></use>';
        A.FT.innerHTML = Ju(A.ft);
        u.appendChild(A.FT);
        zK(A.FT);
    }

    function Fl(i, r) {
        if (A.a.requestFullscreen) {
            A.a.requestFullscreen();
        } else if (A.a.mozRequestFullScreen) {
            A.a.mozRequestFullScreen();
        } else if (A.a.webkitRequestFullscreen) {
            A.a.webkitRequestFullscreen(true);
        }
        We(i, r);
        A.f = true;
        setTimeout(Rs,50);
    }

    function Of(i, r) {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        FE(i, r);
        A.f = false;
        setTimeout(Rs,50);
    }

    function zK(i) {
        var r = el[10];
        d(i, ev[9],() => {
            if (A.Cf) return false;
            if (!A.f) {
                Fl(i, r);
            } else {
                Of(i, r);
            }
        }, false);
        En(i, r);
    }

    function We(q, h) {
        $(A.a).addClass(h);
        q.innerHTML = Ju('<defs><path d="M13,10 L10,10 L10,13 L7,13 L7,16 L13,16 L13,10 Z" id="ut-p-svg-16"></path><path d="M29,16 L29,13 L26,13 L26,10 L23,10 L23,16 L29,16 Z" id="ut-p-svg-17"></path><path d="M29,23 L29,20 L23,20 L23,26 L26,26 L26,23 L29,23 Z" id="ut-p-svg-18"></path><path d="M10,26 L13,26 L13,20 L7,20 L7,23 L10,23 L10,26 Z" id="ut-p-svg-19"></path></defs><use class="ut-p-svg-shadow ut-p-fullscreen-close-button-corner-0" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-16"></use><use class="ut-p-svg-shadow ut-p-fullscreen-close-button-corner-1" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-17"></use><use class="ut-p-svg-shadow ut-p-fullscreen-close-button-corner-2" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-18"></use><use class="ut-p-svg-shadow ut-p-fullscreen-close-button-corner-3" stroke="#000" stroke-opacity=".15" stroke-width="2px" xlink:href="#ut-p-svg-19"></use><use class="ut-p-svg-fill ut-p-fullscreen-close-button-corner-0" fill="#fff" xlink:href="#ut-p-svg-16"></use><use class="ut-p-svg-fill ut-p-fullscreen-close-button-corner-1" fill="#fff" xlink:href="#ut-p-svg-17"></use><use class="ut-p-svg-fill ut-p-fullscreen-close-button-corner-2" fill="#fff" xlink:href="#ut-p-svg-18"></use><use class="ut-p-svg-fill ut-p-fullscreen-close-button-corner-3" fill="#fff" xlink:href="#ut-p-svg-19"></use>');
        $(q).attr(el[9], lan.cful);
    }

    function FE(o, i) {
        $(A.a).removeClass(i);
        o.innerHTML = Ju(A.ft);
        $(o).attr(el[9], lan.ful);
    }

    d(document, 'fullscreenchange', exitHandler);
    d(document, 'webkitfullscreenchange', exitHandler);
    d(document, 'mozfullscreenchange', exitHandler);
    d(document, 'MSFullscreenChange', exitHandler);

    function exitHandler() {
         d(document, 'fullscreenchange', (e) => {
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                if (A.f) Of(A.FT, el[10]);
                if (A.OS) sizeBoxSetting(0, 0);
            }
        });
    }

    function En(g, h) {
        d(A.b, ev[10], () => {
            if (!A.f) {
                Fl(A.FT, el[10]);
            } else {
                Of(A.FT, el[10]);
            }
            A.Q = true;
            setTimeout(() => {
                A.Q = false;
            }, 730);
        });
    }

    // Setting
    function Yt(e, h) {
        Rz();
        A.Cf = false;
        $(e).bind('click', function(e) {
            if (!A.Cf) {
                A.Cf = true;
                $(this).attr(h, true);
                Ez(true);
                $(A.tt).attr(el[1], true);
            } else {
                OutSetting(e, h);
            }
            e.stopPropagation();
        });
        d(document.body, 'click', event => {
            if (A.Cf) {
                OutSetting(e, h);
            }
        });
    }

    function OutSetting(z, m) {
        A.Cf = false;
        $(z).attr(m, false);
        if (!A.v.paused) P();
        Ez(false);
        setTimeout(() => {
            $(A.tt).attr(el[1], false);
        }, 500);
    }

    function Rz() {
        A.Ee = E(['', {
            class: 'ut-p-popup ut-p-settings-menu'
        }]);
        A.speed = lan.standard;
        A.a.appendChild(A.Ee);
        sT(A.Ee);
    }

    function Setting() {
        var a = '';
        if (setting.mess) a = '<div class="' + el[12] + '" role="menuitemcheckbox" ' + el[17] + '="true"><div class="' + el[12] + '-label">' + lan.mess + '</div><div class="' + el[12] + '-content"><div class="' + el[12] + '-toggle-checkbox"></div></div></div>';
        return '<div class="ut-p-panel"><div class="ut-p-panel-content"><div class="ut-p-menu" role="menu" id="ut-p-main-menu-id"><div class="' + el[12] + '" role="menuitemcheckbox" ' + el[17] + '="' + setting.autoNext + '"><div class="' + el[12] + '-label">' + lan.atn + '</div><div class="' + el[12] + '-content"><div class="ut-p-menuitem-toggle-checkbox"></div></div></div>' + a + '<div class="' + el[12] + '" aria-haspopup="true" role="menuitem"><div class="' + el[13] + '">' + lan.speed + '</div><div class="ut-p-menuitem-content ut-sp">' + curSpeed() + '</div></div><div class="' + el[12] + '" aria-haspopup="true" role="menuitem"><div class="' + el[13] + '">' + lan.quality + '</div><div class="ut-p-menuitem-content"><span class="ut-p-menu-label-secondary">' + setting.quality + 'p ' + (setting.quality >= 720 ? '<sup class="ut-p-swatch-color">HD</sup>' : '') + '</span></div></div></div></div></div>';
    }

    function AriaHidden(lm, timeout, callback) {
        ShowAnimateSlow(lm);
        setTimeout(() => {
            HideAnimateSlow(lm);
            if (callback) callback();
        }, timeout);
    }

    function sizeBoxSetting(a, b) {
        var c = {
            height: $('.' + el[12]).length * (!A.f ? 27 : a),
            width: (!A.f ? 206 : b)
        };
        $(A.Ee).find(el[15]).css(c);
        $(A.Ee).css(c);
    }

    function Ez(s) {
        var st = $(A.Ee);
        A.OS = false;
        if (s) {
            A.OS = true;
            AriaHidden([st], 100);
            st.append(Setting());
            sizeBoxSetting(41, 292);
            $('.' + el[12]).bind('click',function() {
                filterSetting($(this));
            });
        } else {
            A.OS = false;
            AriaHidden([st], 100,() => {
                st.hide();
                $(A.Ee).find(el[15]).remove();
            });
            $('.' + el[12]).unbind('click');
        }
    }

    function filterSetting(p) {
        var a = p.find('.' + el[13]).text(),
            b = 'ut-p-popup-animating';
        switch (a) {
            case lan.mess:
                console.log('tin nhắn');
                break;

            case lan.atn:
                autoNext(p);
                break;

            case lan.speed:
                SpeedVideo(b, true);
                break;

            case lan.quality:
                SpeedVideo(b, false);
                break;
        }
    }

    function autoNext(h) {
        var a = true;
        if (a) {
            h.attr(el[17], true);
            a = false;
        }
        else {
            h.attr(el[17], false);
            a = true;
        }
    }

    function HtmlSpeed(w, h) {
        var a = [0.25, 0.5, 1, 1.25, 1.5, 2],
            c = E(['', { class: 'ut-p-panel-content', 'style': 'height:' + h + 'px' }, ['', { class: 'ut-p-menu' }]]),
            b = E(['', { class: 'ut-p-panel', style: 'transform: translateX(' + w + 'px); opacity: 1; width:' + w + 'px; height: ' + h + 'px;' }, ['', { class: 'ut-p-panel-header' }, ['button:' + lan.speed, { class: 'ut-p-button ' + el[16] }]], c]);
        for (var i = 0; i < 6; i++) {
            if (a[i] == 1) a[i] = lan.standard;
            var e = E([':' + a[i], { class: 'ut-p-menuitem-label' }]),
                m = (a[i] == A.speed ? true : false),
                d = E(['', { class: 'ut-p-menuitem', role: 'menuitemradio' }, e]);
            if (m) $(d).attr(el[17], m);
            $(c).find('.ut-p-menu').append(d);
        }
        return b;
    }

    function SpeedVideo(a, c) {
        var Eu = $(A.Ee);
        if (c) {
            var w = (!A.f ? 83 : 130),
                h = (!A.f ? 183 : 280);
            $(A.Ee).append(HtmlSpeed([w, h]));
        } else {
              var length = dataVideo.items.length,
                w = (!A.f ? 95 : 145),
                rol = 'menuitemradio',
                h = (!A.f ? (length + 1) * 26 : (length + 1) * 40);

            var rg = ['',{class : 'ut-p-menu ut-p-quality-menu'}];
            for(var i = 0; i < length; i++)
            {
                var height = dataVideo.items[i].height,
                    disp = ['span:'+ height +'p',{class : 'ut-noth'}];
                if(height >= 720)
                    disp.push(['sup:HD', {class : 'ut-p-swatch-color'}]);

                var obt = {class : el[12], role : rol};
                if(height == setting.quality) obt[el[17]] = true;
                var y = E(['', obt, ['',{class : el[13]},['',{class : 'ut-noth'}, disp]]]);
                rg.push(y);
                $(y).data('tung', height);
            }
            var ru = E(['',{class : 'ut-p-panel-content'}, rg]);
            var d = E(['', {class : 'ut-p-panel', style: 'transform: translateX(' + w + 'px); opacity: 1; width: ' + w + 'px; height: ' + h + 'px;'},['',{class : 'ut-p-panel-header'},['button:Chất lượng' ,{class: el[5] + ' ' + el[16]}]], ru]);

            $(A.Ee).append(d);
        }

        $(el[15]).addClass(el[14]);
        Eu.addClass(a).css({
            height: h,
            width: w
        });
        setTimeout(() => {
            $(el[15] + ':eq(1)').css({
                transform: 'translateX(0)'
            });
        }, 50);
        var b = $(el[15] + ':eq(0)');
        b.css({
            transform: 'translateX(-' + $(b).width() + 'px)'
        });
        setTimeout(function() {
            Eu.removeClass(a);
            Eu.find('.' + el[14]).removeClass(el[14]);
            $(el[15] + ':eq(0)').remove();
        }, 280);
        $('.' + el[12] + ',.' + el[16]).click(function() {
            (c ? setSpeed(this, Eu) : setQuality(this));
            Eu.append(Setting());
            Eu.addClass(a);
            $(el[15]).addClass(el[14]);
            var t = $(el[15] + ':eq(0)'),
                u = $(el[15] + ':eq(1)');
            u.css({
                transform: 'translateX(-' + (!A.f ? 206 : 292) + 'px)'
            });
            setTimeout(() => {
                u.css({
                    transform: 'translateX(0)'
                });
                t.css({
                    transform: 'translateX(' + w + 'px)'
                });
                $('.' + el[12]).bind('click',function() {
                    filterSetting($(this));
                });
            }, 50);
            setTimeout(() => {
                Eu.removeClass(a);
                Eu.find('.' + el[14]).removeClass(el[14]);
                t.remove();
            }, 300);
            setTimeout(() => {
                var c = {
                    height: $(Setting()).find('.' + el[12]).length * (!A.f ? 27 : 41),
                    width: (!A.f ? 206 : 292)
                };
                u.css(c);
                Eu.css(c);
            }, 51);
        });
    }

    function setSpeed(l, h) {
        var a = l.textContent;
        if (a == lan.speed) return false;
        A.au.playbackRate = A.v.playbackRate = (a == lan.standard ? 1 : l.textContent);
        $(l).parent().find('[' + el[17] + ']').removeAttr(el[17]);
        $(l).attr(el[17], true);
        A.speed = a;
    }

    function curSpeed() {
        var a = A.v.playbackRate;
        return (a == 1 ? lan.standard : a);
    }

    function setQuality(d) {
        var qua = parseInt($(d).text());
        if($.inArray(qua, [360, 480, 720, 1080]) == -1 || isNaN(qua))
            return false;
        (qua >= 720 ? $(A.ST).addClass(el[18]) : $(A.ST).removeClass(el[18]));

        $(d).parent().find('['+el[17]+']').removeAttr(el[17]);
        $(d).attr(el[17], true);

        setting.quality = localStorage.quality = qua;
        var lk = fillterQuality(qua),
            current = A.v.currentTime,
            duration = A.v.duration,
            pause = A.v.paused;
        A.v.src = lk[0].link;
        A.au.currentTime = A.v.currentTime = current; 
        (!pause ? A.v.play() & A.au.play() : null);
        A.DR.innerHTML = T(duration);
    }

    function resetProcess() {

    }

    function ShowError(err) {
        $('.alert-danger').show();
        var input = $('#linkVD'),
            button= $('#sendN');
        $('#messs').html(err);
        input[0].disabled = false;
        button[0].disabled = false;
        setTimeout(function() {
            $('.alert-danger').hide();
        }, 4000);
    }

    function SettimeByCmt() {
        $(document).on('click', '[data-duration]', function(e) {

            A.v.currentTime = A.au.currentTime = this.getAttribute('data-duration');
        })
    }

    function CheckLink(link) {
        var link = regexFB.exec(link) || regexYTB.exec(link);
        regexYTB.lastIndex = 0;
        regexFB.lastIndex = 0;

        return link;
    }

    function FirstStep(result, err) {
        if(result) {
            var step1 = $('.step-1');
            step1.children('.fa-spin').remove();

            if(result.error) {
                step1.addClass(A.error).append(A.skull);
                return ShowError('An error occurred when reading link video, please try again.');
            } else {
                 step1.addClass(A.done).append(A.check)
            }
            
            if(result.redir) return document.location = location.origin + '/' + result.redir;
            result = result.data;
            $('.step-2').append(A.spin);
            $.post('/action', {step: 2, id: result.id, t: result.t, tt: result.tt}, SecondStep.bind(this, result.id));
        } else {
            console.log('link video bị lỗi');
        }
    }

    function SecondStep(id, result) {
        var step2 = $('.step-2');
        if(result.error) {
            step2.addClass(A.error).append(A.skull);
            return ShowError('An error occurred while loading the audio, please try again.');
        }
        step2.children('.fa-spin').remove();
        step2.addClass(A.done).append(A.check);
        $('.step-3').append(A.spin);
        $.post('/action', {step: 3, id: id}, ThirdStep.bind(this, id));
    }

    function ThirdStep(id, result) {

        var step3 = $('.step-3');
        if(result.error) {
            step3.addClass(A.error).append(A.skull);
            return ShowError('An error occurred while loading the video, please try again.');
        }

        step3.children('.fa-spin').remove();
        step3.addClass(A.done).append(A.check);
        $('.step-4').append(A.spin);
        $.post('/action', {step: 4, id: id}, FourStep);
    }

    function FourStep(result, error) {
        $('.step-4 .fa-spin').remove();
        $('.step-4').addClass(A.done).append(A.check);
        $('.step-5').addClass(A.done);
        document.location = location.origin + '/' + CheckLink($('#linkVD').val())[1];
    }


    function Send() {
        $.post('/dv');
        $('#iSend').submit(function(e) {
            e.preventDefault();
            var step1 = $('.step-1'),
                input= $('#linkVD'),
                button= $('#sendN'),
                link = input.val();

            if(link == "") return ShowError('This field cannot be left blank');
            if(CheckLink(link) == null)
            
                return ShowError('This link is not supported.');
            
            $('#process').show();
            input[0].disabled = true;
            button[0].disabled = true;

            step1.append(A.spin);
            $.post('/action', {step: 1, link: CheckLink(link)[0]}, FirstStep);
        })
    }

    function sendMess() {
        $('#iSendMess').submit(function(e) { 
            e.preventDefault();
            var content = $('#boxmess').val(),
                time = Math.floor(A.v.currentTime);
            $('.ut-ul-cmt').append(`<li data-duration="${time}"><span>${T(A.v.currentTime)}</span>${content}</li>`);
            $.post('/postComment', {id: dataVideo.id, time: time, content: content});
        });
    }

     function init() {
        JollyUt();
        Send();
        sendMess();
        SettimeByCmt();
        d(window, ev[7], Rs);
    }

    init();
})();