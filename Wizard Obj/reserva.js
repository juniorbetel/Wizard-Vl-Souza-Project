function Dates(date1, date2, tempoContrato) {
    this.date1 = date1;
    this.date2 = date2;
    this.tempoContrato = tempoContrato;
    this.checkDate = function(e, p) {
        if (moment(e).isSameOrBefore(p)) {
            return true
        } else {
            return false
        }
    }
    this.dateDif = function(w, z) {
        let x = moment.preciseDiff(w, z, true)
        return x
    }
    this.printYearMonthDay = function(year, month, day, obj) {
        $(year).html(obj.years)
        $(month).html(obj.months)
        $(day).html(obj.days)
    }
    this.addDate = function(dateX, dateY, element) {
        let x = moment(dateX).add(dateY, "days").format("yyyy-MM-DD");
        $(element).val(x)
        return x
    }
    this.SubtractDate = function(dateX, dateY, element) {
        let x = moment(dateX).add(dateY, "days").format("yyyy-MM-DD");
        $(element).val(x)
        return x
    }
}

$(".date-form").on("change", (e) => {
    target = e.target;
    tempoPassado = new Dates()
    tempoRestante = new Dates()
    inicioContrato = new Dates(moment($("#inicio-contrato").val()))
    terminoContrato = new Dates()
    contratoInciaEm = new Dates()
    tempoContrato = parseInt($("#quantos-tempo").val())
    if (tempoContrato != 0) {
        $(".tempo").css("display", "flex")
        let dateDif1;
        let dateDif2;
        let answer;

        dateDif2 = terminoContrato.addDate(inicioContrato.date1, tempoContrato, $("#termino-contrato"))

        answer = inicioContrato.checkDate(inicioContrato.date1, moment())
        if (answer) {
            dateDif1 = tempoPassado.dateDif(inicioContrato.date1, moment());
            tempoPassado.printYearMonthDay("#tempo-passado-y", "#tempo-passado-m", "#tempo-passado-d", dateDif1)
            dateDif2 = tempoRestante.dateDif(moment($("#termino-contrato").val()), moment());
            tempoRestante.printYearMonthDay("#tempo-restante-y", "#tempo-restante-m", "#tempo-restante-d", dateDif2)


        } else {
            $("#label-tempo-passado").html("Incio Contratual será em:")
            $(".tempo-restante").css("display", "none")
            dateDif1 = contratoInciaEm.dateDif(inicioContrato.date1, moment());
            contratoInciaEm.printYearMonthDay("#tempo-passado-y", "#tempo-passado-m", "#tempo-passado-d", dateDif1)

        }






        /*         tempoPassado = moment.preciseDiff(inicioContrato, moment(), true)
                console.log(tempoPassado.years, tempoPassado.months, tempoPassado.days)
                $("#tempo-restante-y").html(tempoPassado.years)
                $("#tempo-restante-m").html(tempoPassado.months)
                $("#tempo-restante-d").html(tempoPassado.days)
         */
    }

})