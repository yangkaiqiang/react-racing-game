import * as THREE from "three";
import gsap from "gsap";
import Floor from "./Floor.js";
import Areas from "./Areas.js";
import Sounds from './Sounds.js';
import Objects from "./Objects.js";
import Materials from "./Materials.js";
import IntroSection from "./sections/IntroSection.js";

export default class {
    constructor(_options){
        this.time = _options.time;
        this.camera = _options.camera;
        this.resources = _options.resources;

        this.container = new THREE.Object3D();
        this.container.matrixAutoUpdate = false;

        //设置声音
        this.setSounds();

        //设置地面
        this.setFloor();

        //设置世界中的区域加载
        this.setAreas();

        //设置启动屏
        this.setStartingScreen();
    }

    start() {
        this.setReveal();
        this.setMaterials();
        this.setObjects();
        this.setSections();
    }

    setStartingScreen() {
        this.startingScreen = {};
        
        this.startingScreen.area = this.areas.add({
            position: new THREE.Vector2(0, 0),
            halfExtents: new THREE.Vector2(2.35, 1.5),
            active: false,
        });

        this.startingScreen.loadingLabel = {};
        this.startingScreen.loadingLabel.geometry = new THREE.PlaneBufferGeometry(2.5, 2.5/4);
        this.startingScreen.loadingLabel.image = new Image();
        this.startingScreen.loadingLabel.image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABABAMAAAAHc7SNAAAAMFBMVEUAAAD///9ra2ucnJzR0dH09PQmJiaNjY24uLjp6end3d1CQkLFxcVYWFiqqqp9fX3nQ5qrAAAEVUlEQVRo3u3YT08TQRQA8JEtW6CATGnDdvljaTwYE2IBI/HGRrwSetGTsZh4MPFQYiQe229gE++WePFY9Oqh1cRzieEDYIgXLxjPJu5M33vbZQszW+fgoS+B7ewO836znRl2lg1jGMP4P2Okw0yFvaKsklr3I99Tvl3iPPelGbQhKqxB4eN6N/7gVcsvbEAz1F4RLn67zzl/v6/oLvejGBQ9LsNphio4UFjmEAsVJuOK/zkDtc6w+gyTcZ3LyP6IAzjBDA+pj6LkEgAjW4kANsMAC6vmOvqAMU5RgVOTskQACicCmCcA9AXjkT5gj1MswqlxWcoTgKJ6HuAQAD5guNoAu8QpMnBul1ONMGD2PCBbRgDAKYq6AEtmXvtdj3S6GhRyW1t1DvkAgM0ggG7mu1t3xWFHFzAqv3wYCi0mY1UCGgiQPU+1oWIY8LoXcAA3qeYfr+kClvHW14PJ5OfCAgHYNAoDAORBQIrDvHjqH5c0ANTbORzBacbAQgUC2IAKAzI9gCSHlWEMLmgBPJxMvyARpIICALDm4nkAbwIA71EZx5UOgO48JnLoOhQIAN9sOgKoBoAE5r0aB8ARcNhtFzrg0VQmwCp8CAMeAADGc44S5GMBsF1aCEU2LcAcAPDCvwFytBDehCaUgJxRAKeF8BNUUQJ43iiAUlqwFKoBrTCAHjiagwEgU0YM5IYWYD4KoIgPwIXQwUbVgCXzgLpIBJNeDciWTQNskVsq1ADX/6kYBdCTjse5owbMiX+IpgGWOCPSuWpA2vN/TAMm5QTYg5IC4FdbMA0YF5Nb5s2rAaLyhzBgektGZWDArrgqi0U1QHxf38OABDwUDgTAjGfyPlTVgJT/67FBACbqyGYaaoBctQwD2vI4DecVAPkgZRhQlxPQks2rAePGAbZsRlaa1QBYEQBUHRCAmaXD0QDYxgFWdye05R9cDQCrmQYkeBA6gGXTgNEeQF4DMG4S4MLjOUZRA5A0CcjADgmjqgGwSwSg9wK1GIBS74KTgTxv/EHoiaVQsTOS5RoCJuiZyosB8EIrHpyowFiYofO0i4wCjhCQwL0hq2sCaFNM22S4JXloLk0AuLDTBzCBAAt3xykeA7CHe/mDbgdTvQ9GswSAwdbqA0giYASHjQUJnhQKhQ6z/d8rDA4hAG2Dsk042ejubHMM2nV6AMf93pCkaRjhh0WsWuz+6aasl2FwiAImReEts1/CSaFfwFouAJxC4RW+I4oCThBQE1X2WbKkBFDkqYDtJ0SHaYKq3pJJwCECjjiFPoC1w+2P0gumurgeBjT6AhIIGKOelGIAngWlFnRnMZjMIYBb7gtIIsAuYU+8GICpEhYyZVgIZ2g9rYYAX1lfAKvjnxzjnWrHALDn9K1h2k2aoI1ewGd2AWAVAVMHcKdW4wDYje739pNufJXhkJohgLu9zy4CHCKAJYUge4ddCojGyPrp9kaHmYjUi9N7+2wYwxjGZfEXMKxGE0GkkfIAAAAASUVORK5CYII=';
        this.startingScreen.loadingLabel.texture = new THREE.Texture(this.startingScreen.loadingLabel.image);
        this.startingScreen.loadingLabel.texture.magfilter = THREE.NearestFilter;
        this.startingScreen.loadingLabel.texture.minFilter = THREE.LinearFilter;
        this.startingScreen.loadingLabel.texture.needsUpdate = true;
        this.startingScreen.loadingLabel.material = new THREE.MeshBasicMaterial({
            transparent: true,
            depthWrite: false,
            color: 0xffffff,
            alphaMap: this.startingScreen.loadingLabel.texture
        });
        this.startingScreen.loadingLabel.mesh = new THREE.Mesh(
            this.startingScreen.loadingLabel.geometry,
            this.startingScreen.loadingLabel.material
        );
        this.startingScreen.loadingLabel.mesh.matrixAutoUpdate = false;
        this.container.add(this.startingScreen.loadingLabel.mesh);
    
        this.startingScreen.startLabel = {};
        this.startingScreen.startLabel.geometry = new THREE.PlaneBufferGeometry(2.5, 2.5/4);
        this.startingScreen.startLabel.image = new Image();
        this.startingScreen.startLabel.image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABABAMAAAAHc7SNAAAAMFBMVEUAAAD///+cnJxra2vR0dHd3d0mJib09PRYWFjp6em4uLhCQkKqqqqNjY19fX3FxcV3XeRgAAADsklEQVRo3u3YsU9TQRwH8KNgLSDQg9ZCAak1IdE4PKPu1NTEsSzOMDl3I3GpcXAxBhLjXFxNjJgQJ2ON0Rnj4uAAEyv8B/L7tV++5/VN+CM69Ldwfa+534d7d793VzeIQQzi/49c4v5lPF/1vvhFm++rjIpcyErrmrSCuz+cxng1iL/If8drPJD2Lc/Iy4VhaZWlFd4tLPfuMc6e/5LvRilJA2SkVSQA8c0OsI0uNtIAU9rsB8y1rAAZjyimAUa1mQDAeGwF+MA+9lIA69qs9AMKVoDP8vhf35A+NiMAc7YJKFSrX7tcI8BW9+k/O/kz6zSunjSnncMHiQYBcmdXrh3xCVbc2WO8N/YZZI0AxxwMArKivmwAwFKSPmV0UwBbCpj5E+C+yzUbQAaJVwUSA9SFjwFgHQ0jAMrBWgzAPCtHgFFbQAlpEwKC2zWUQgJGbAH+naSdu/fTxQAthPL5/ADD6OCpQwCAsb6LsbEGcBluOAYBmG2fkMIawHVWXEsDIGUGpZCAIRsAS93DPgDbhUmUQgKe2NUB90hfhK0YwEJYHkYpJGDbqBKiB86CGLAlzd6/S8CEvh8sACiBvrSXCshKblWEgNy2vkAMAHwGfjECcJHOu5qUQgDm6vXulshZAXJNL9GJAeg+LxeKPQBj1gzgdlnuCWAhbOi7LwaU9u0A2VWPpUgAC+GR5k0iwBtnB3Bj3qMaRYB17X0IOQhYcjYA7guxxyIAGfd1HNqchPfly7aACQUshAA2W1r5G1yG415YpgB3qIIkAHBH2D075QnQ10fHDsCl+CoGSKpiN8kMAVqIN00BsitnVgKyPIBMB4ADKU92AA5BKQIgszjKBGBLagpwB5xZBGS6pbcuizQAXMA6NAK86OCQ3okAI55BQPe7VoDxXzU/iwPASgS4GAASAiYxWgYAzvAa1loA2AkAFQIU2zEELCJtDDgIAG0CFLvp7LblC2kAtF6eTEJJ2CBAr88bAXKY4WkASbzXmwt5AvTvohHA4WSUBmj2Jt+IThQChrAOLQC13vPFMAOAQwuyTAeAKVQto3OBDOdESh2YxNZPbpYBQNbEAoBfod7e1i1BiwB0voSZWgwAOWgtAGPhD18E8ASIiRIAXNPwXJBtcqMbAFAIr5weIJMAcIx1aAAIqk0lAuycompyFwBMHAsAZlj/lgw0rsy2AkhbsgK4Q+70CUBjxeFXsUb0G1HJDJC9rketZRcCWCJwHM8DgJm7b7ch+XizXm25QQxiEOcXvwGCWOhbCZC0qAAAAABJRU5ErkJggg==';
        this.startingScreen.startLabel.texture = new THREE.Texture(this.startingScreen.startLabel.image);
        this.startingScreen.startLabel.texture.magfilter = THREE.NearestFilter;
        this.startingScreen.startLabel.texture.minFilter = THREE.LinearFilter;
        this.startingScreen.startLabel.texture.needsUpdate = true;
        this.startingScreen.startLabel.material = new THREE.MeshBasicMaterial({
            transparent: true,
            depthWrite: false,
            color: 0xffffff,
            alphaMap: this.startingScreen.startLabel.texture
        })
        this.startingScreen.startLabel.material.opacity = 0;
        this.startingScreen.startLabel.mesh = new THREE.Mesh(
            this.startingScreen.startLabel.geometry,
            this.startingScreen.startLabel.material
        );
        this.startingScreen.startLabel.mesh.matrixAutoUpdate = false;
        this.container.add(this.startingScreen.startLabel.mesh);
        
        this.resources.on('progress', _progress => {
            this.startingScreen.area.floorBorder.material.uniforms.uAlpha.value = 1;
            this.startingScreen.area.floorBorder.material.uniforms.uLoadProgress.value = _progress;
        })
        
        this.resources.on('ready', () => {
            

            window.requestAnimationFrame(() => {
                //此方法控制在loading加载过程中是否可点击 切换页面
                this.startingScreen.area.activate();

                gsap.to(this.startingScreen.area.floorBorder.material.uniforms.uAlpha, {duration: 0.3, value: 0.3 });
                gsap.to(this.startingScreen.loadingLabel.material, {duration: 0.3, opacity: 0});
                gsap.to(this.startingScreen.startLabel.material, {duration: 0.3, opacity: 1, delay:0.3});
            })
        })

        this.startingScreen.area.on('interact', () => {
            this.startingScreen.area.deactivate();

            gsap.to(this.startingScreen.area.floorBorder.material.uniforms.uProgress, { duration: 0.3, delay: 0.4, value: 0});
            gsap.to(this.startingScreen.startLabel.material, {duration: 0.3, delay: 0.4, opacity: 0});
        
            this.start();

            window.setTimeout(() => {
                this.reveal.go();
            }, 600);
        })
    }

    setSounds(){
        this.sounds = new Sounds();
    }

    setFloor(){
        this.floor = new Floor();
        this.container.add(this.floor.container)
    }

    setAreas(){
        this.areas = new Areas({
            // renderer: this.renderer,
            time: this.time,
            camera: this.camera,
            sounds: this.sounds,
            resources: this.resources
        })
        this.container.add(this.areas.container)
    }

    setReveal(){
        this.reveal = {};

        this.reveal.matcapsProgress = 0;
        this.reveal.previousMatcapsProgress = null;

        this.reveal.go = () => {
            gsap.fromTo(
              this.reveal,
              { matcapsProgress: 0 },
              { matcapsProgress: 1, duration: 3 }
            );
        }

        this.time.on("tick", () => {
            if (this.reveal.matcapsProgress !== this.reveal.previousMatcapsProgress) {
              for (const _materialKey in this.materials.shades.items) {
                const material = this.materials.shades.items[_materialKey];
                material.uniforms.uRevealProgress.value = this.reveal.matcapsProgress;
              }
            }
        });
    }

    setMaterials(){
        this.materials = new Materials({
            time: this.time,
            resources: this.resources
        });
    }

    setObjects(){
        this.objects = new Objects({
            materials: this.materials,
        });

        this.container.add(this.objects.container);
    }

    setSections(){
        this.sections = {};

        const options = {
            resources: this.resources,
            objects: this.objects,
        };

        // Intro
        this.sections.intro = new IntroSection({
            ...options,
        });
        this.container.add(this.sections.intro.container);
    }
}