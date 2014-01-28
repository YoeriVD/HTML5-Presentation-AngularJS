var Voedsel = (function () {
    function Voedsel(naam) {
        this.naam = naam;
    }
    return Voedsel;
})();
var Hond = (function () {
    function Hond(geluid) {
        this.geluid = geluid;
    }
    Hond.prototype.kanEten = function (eten) {
        return eten.naam === "brokken";
    };
    return Hond;
})();
var Kat = (function () {
    function Kat(geluid) {
        this.geluid = geluid;
    }
    Kat.prototype.kanEten = function (eten) {
        return eten.naam === "vis";
    };
    return Kat;
})();
var beesten = new Array();
beesten.push(new Hond("woef"));
beesten.push(new Kat("miauw"));
var brokjes = new Voedsel("brokken");
window.onload = function () {
    beesten.forEach(function (beest) {
        if(beest.kanEten(brokjes)) {
            var p = document.getElementById("#geluid");
            p.innerHTML = beest.geluid;
        }
    });
};
