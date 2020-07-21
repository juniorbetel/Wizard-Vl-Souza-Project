let kids_books = ["tots 2", "tots 4", "Litle Kids", "Kids 2", "Kids 4", "Next Generation"];
let teens_books = ["teens 2", "teens 4", "teens 6", "teens 8"];
let selected;
let curso;
let livro;
let lessons;
let obj;
let lessonInicial;
let indexAulaAtual;
let aulasRestantes;
let modalidade;
let aulasFeitasCurso;
let aulasRestanteCurso;
let inicioContrato, terminoContrato, tempoContrato, tempoPassado, tempoRestante, contratoInciaEm;


//LIVROS
function Book(nome, totalLessons, totalReviews, fisrtLesson, firstReview, modalidade) {
    let lessonsArray = [];
    this.nome = nome;
    this.modalidade = modalidade;
    this.totalLessons = totalLessons;
    this.totalReviews = totalReviews;
    this.fisrtLesson = fisrtLesson;
    this.firstReview = firstReview;
    this.credits = totalLessons + totalReviews;
    this.generateLessons = function() {
        for (let i = 1; i <= totalLessons; i++) {
            lessonsArray.push(fisrtLesson)
            if (fisrtLesson % 6 === 0) lessonsArray.push("R" + firstReview++);
            fisrtLesson++;
        }
        return lessonsArray;
    };
    //this.lessons = this.generateLessons();
    this.to_String = function() {
        let newArray = [];
        for (const prop of this.generateLessons()) {
            newArray.push(prop.toString())
        }
        return newArray;
    }
    this.lessons = this.to_String();

};
let w2 = new Book("w2", 60, 10, 1, 1, "adults");
let w4 = new Book("w4", 60, 10, 61, 11, "adults");
let w6 = new Book("w6", 60, 10, 121, 21, "adults");
let w8 = new Book("w8", 60, 10, 181, 31, "adults");
let w10 = new Book("w10", 60, 10, 241, 41, "adults");
let w12 = new Book("w12", 60, 10, 301, 51, "adults");

let bookColletion = { w2, w4, w6, w8, w10, w12 };
//CURSOS----
function Curso(modalidade, livros) {
    this.modalidade = modalidade;
    this.livros = livros;
    this.getTotalLessons = function() {
        let courseLessons = [];
        for (let i = 0; i < livros.length; i++) {
            for (lesson of livros[i].lessons) {
                courseLessons.push(lesson)
            }
        }
        return courseLessons;
    }

}
let adults = new Curso("adults", [w2, w4, w6, w8, w10, w12]);
let teens = new Curso("teens", teens_books);
let kids = new Curso("kids", kids_books);

let cursos = {
    kids,
    teens,
    adults,
    totalLessons: function() {
        console.log("df");
    }
}

function reset() {
    $("#curso-list").removeClass("active")
    $("#lesson-list").empty()
    $("#curso-progression").css("width", 0)
    $("#curso-progression").html("")
    $("#curso-progression1").html("")
    $("#curso-progression1").css("width", 0)
    $("#aula-atual").text("");
    $("#aulas-restantes").text("");
    $("#aulas-feitas-curso").html("");
    $("#aulas-restantes-curso").html("");
}

function generateOptions(obj, curso) {
    let arr = obj
    if (!Array.isArray(obj)) arr = Object.keys(obj);
    let options = ``;
    for (const key of arr) {
        options += `<li class="${curso} curso__item ${key}"><a href="#" class= "${key} curso__link ">${key}</a></li>`;
    }
    return options;
}

function to_String(arr) {
    let newArray = [];
    for (const prop of arr) {
        newArray.push(prop.toString())
    }
    return newArray;
}

function progressBar(total, parcial, bar) {
    let percentage = (parcial * 100) / total
    percentage = percentage.toFixed(1)
    let width = 0;
    let x = setInterval(function() {
        if (width >= percentage) {
            clearInterval(bar)
        } else {
            width++;
            $(bar).css("width", width + "%")
            $(bar).html(percentage + "%")
        }
    }, 10)
}

function Contract(start, duration) {
    this.start;
    this.duration;
    this.end;
    this.timePast;
    this.timeRemaning;
    this.timeToStart;
    this.addDate = function(dateX, dateY, element) {
        let x = moment(dateX).add(dateY, "days").format("yyyy-MM-DD");
        $(element).val(x)
        return x
    }
    this.dataDif = function(dateX, dateY) {
        let obj = moment.preciseDiff(dateX, dateY, true)
        return obj = { years: obj.years, months: obj.months, days: obj.days }
    }
    this.printYearMonthDay = function(year, month, day, obj) {
        //      console.log(year, month, day, obj)
        $(year).html(obj.years)
        $(month).html(obj.months)
        $(day).html(obj.days)
    }
    this.MultipleFunctions = function() {
        contract.pastTime = contract.dataDif(moment(), contract.start);
        contract.printYearMonthDay("#tempo-passado-y", "#tempo-passado-m", "#tempo-passado-d", contract.pastTime)
        contract.timeRemaning = contract.dataDif(contract.end, moment())
        contract.printYearMonthDay("#tempo-restante-y", "#tempo-restante-m", "#tempo-restante-d", contract.timeRemaning)
    }
    this.MultipleFunctions2 = function() {
        $("#label-tempo-passado").text("Contrato inicia em:")
        contract.timeToStart = contract.dataDif(contract.start, moment())
        contract.printYearMonthDay("#tempo-passado-y", "#tempo-passado-m", "#tempo-passado-d", contract.timeToStart)
    }

}



$("#cursos").on("click", function(e) {
    let newArr = [];
    reset()
    modalidade = e.target.textContent;
    $("#livros").toggleClass("active");
    livros = cursos[modalidade].livros
    for (key of livros) {
        newArr.push(key.nome)
    }
    $("#curso-list").html(generateOptions(newArr, modalidade))
});
$("#livros").on("click", function(e) {
    $("#aula-atual").text("");
    $("#curso-progression").css("width", 0)
    $("#curso-progression").html("")
    selectedBook = e.target.textContent;
    livro = bookColletion[selectedBook].lessons
    $("#lessons").toggleClass("active");
    lessons = (livro);
    $("#lesson-list").html(generateOptions(lessons, selectedBook))
});

$("#lessons").on("click", (e) => {
    let totalDeAulas;
    if ($(e.target).parent().hasClass(selectedBook)) {
        lessonInicial = e.target.textContent;
        selectedlesson = bookColletion[selectedBook].lessons;
        selectedlesson = to_String(selectedlesson)
        aulasRestantes = (selectedlesson.length - 1) - (selectedlesson.indexOf(lessonInicial))
        $("#aula-atual").text(selectedlesson.indexOf(lessonInicial) + 1);
        $("#aulas-restantes").text(aulasRestantes)
        progressBar((selectedlesson.length), (selectedlesson.indexOf(lessonInicial) + 1), $("#curso-progression"));
        aulasFeitasCurso = cursos[modalidade].getTotalLessons().indexOf(lessonInicial) + 1
        totalDeAulas = (cursos[modalidade].getTotalLessons()).length
        aulasRestanteCurso = totalDeAulas - aulasFeitasCurso
        $("#aulas-feitas-curso").html(aulasFeitasCurso);
        $("#aulas-restantes-curso").html(aulasRestanteCurso);
        progressBar(totalDeAulas, aulasFeitasCurso, $("#curso-progression1"));
    }
})

$("#inicio-contrato").val(moment().format("YYYY-MM-DD"))

let contract = new Contract()

$(".date-form").on("change", (e) => {
    contract.start = moment($("#inicio-contrato").val())
    contract.duration = parseInt($("#quantos-tempo").val())
    if (e.target.id == "inicio-contrato" && $("#quantos-tempo").val() != 0) {
        if (moment(contract.start).isSameOrBefore(moment())) {
            $(".tempo").css("display", "flex")
            $("#label-tempo-passado").text("Tempo Passado: ")
            contract.end = moment(contract.addDate(contract.start, contract.duration, $("#termino-contrato")))
            contract.MultipleFunctions()
        } else {
            $(".tempo-restante").css("display", "none")
            contract.MultipleFunctions2()
        }
    }
    if (e.target.id == "quantos-tempo" && $("#quantos-tempo").val() != 0) {
        contract.duration = parseInt($("#quantos-tempo").val())
        contract.end = moment(contract.addDate(contract.start, contract.duration, $("#termino-contrato")))
        if (moment(contract.start).isSameOrBefore(moment())) {
            $(".tempo").css("display", "flex")
            $("#label-tempo-passado").text("Tempo Passado: ")
            contract.MultipleFunctions()
        } else {
            $(".tempo-passado").css("display", "flex")
            contract.MultipleFunctions2()
        }
    } else if ($("#quantos-tempo").val() == 0) {
        $(".tempo").css("display", "none")

    }

    if (e.target.id == "termino-contrato") {
        contract.end = moment(e.target.value)
        $("#termino-contrato").val((contract.end).format("yyyy-MM-DD"))
        if (moment(contract.start).isSameOrBefore(contract.end)) {
            contract.duration = contract.dataDif(contract.start, contract.end)
            $("#quantos-tempo").val("0")
            $("#label-tempo-passado").text("Duração: ")
            contract.printYearMonthDay("#tempo-passado-y", "#tempo-passado-m", "#tempo-passado-d", contract.duration)
        }


    }

})