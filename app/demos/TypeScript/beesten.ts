window.onload = function () {
    beesten.forEach(function (beest) {
        if (beest.kanEten(brokjes)) {
            var pGeluid = document.getElementById("geluid");
            pGeluid.innerHTML = beest.geluid;
        }
    });

}

class Voedsel {
    naam: string;
    constructor(naam: string) {
        this.naam = naam;
    }
}


interface Beest {
    geluid: string;
    kanEten(eten: Voedsel): bool;
}

class Hond implements Beest {
    geluid: string;
    constructor(geluid: string) {
        this.geluid = geluid;
    }
    kanEten(eten: Voedsel) {
        return eten.naam === "brokken";
    }
}

class Kat implements Beest {
    geluid: string;
    constructor(geluid: string) {
        this.geluid = geluid;
    }
    kanEten(eten: Voedsel) {
        return eten.naam === "vis";
    }
}

var beesten = new Array();
beesten.push(new Hond("woef"));
beesten.push(new Kat("miauw"));
var brokjes = new Voedsel("brokken");