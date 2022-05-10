import {Howl, Howler} from "howler";

import uiAreaSound1 from '../../assets/sounds/ui/area-1.mp3';

export default class Sounds{
    constructor(){

        this.items = []

        this.setSettings()
    }

    setSettings(){
        const settings = [
            {
                name: "uiArea",
                sounds: [uiAreaSound1],
                minDelta: 100,
                velocityMin: 0,
                velocityMultiplier: 1,
                volumeMin: 0.75,
                volumeMax: 1,
                rateMin: 0.95,
                rateMax: 1.05,
            }
        ]

        settings.forEach(_settings => this.add(_settings));
    }

    setMute(){

    }

    add(_options){
        const item = {
            name: _options.name,
            minDelta: _options.minDelta,
            velocityMin: _options.velocityMin,
            velocityMultiplier: _options.velocityMultiplier,
            volumeMin: _options.volumeMin,
            volumeMax: _options.volumeMax,
            rateMin: _options.rateMin,
            rateMax: _options.rateMax,
            lastTime: 0,
            sounds: [],
        };

        _options.sounds.forEach(_sound => item.sounds.push(new Howl({src: [_sound]})));
        this.items.push(item);
    }

    play(_name, _velocity = 0){
        const item = this.items.find(_item => _item.name == _name);
        const time = Date.now();

        if(item && time > item.lastTime + item.minDelta && (_velocity == 0 || _velocity > item.velocityMin)){
            const sound = item.sounds[Math.floor(Math.random() * item.sounds.length)];
            
            let volume = Math.min(
                Math.max((_velocity - item.velocityMin) * item.velocityMultiplier, item.volumeMin),
                item.volumeMax
            );
            volume = Math.pow(volume, 2)
            sound.volume(volume);

            const rateAmplitude = item.rateMax - item.rateMin;
            sound.rate(item.rateMin + Math.random() * rateAmplitude);
            
            sound.play();

            item.lastTime = time;
        }
    }
}