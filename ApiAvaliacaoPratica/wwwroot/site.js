const uri = "api/transportadora";
let todos = null;


$(document).ready(function () {
    getData();
    closeInput();
});

function getData() {
    $.ajax({
        type: "GET",
        url: uri,
        cache: false,
        success: function (data) {
            const tBody = $("#get-item");
            tBody.empty();

            $.each(data, function (key, item) {
                const tr = $("<tr></tr>")
                    .append($("<td></td>").text(item.nome))
                    .append($("<td></td>").text(item.cnpj))
                    .append($("<td></td>").text(item.inscricaoEstadual))
                    .append($("<td></td>").text(item.latitude))
                    .append($("<td></td>").text(item.longitude))
                    .append(
                        $("<td></td>").append(
                            $("<button>Editar</button>").on("click", function () {
                                editItem(item.id);
                            })
                        )
                    )
                    .append(
                        $("<td></td>").append(
                            $("<button>Excluir</button>").on("click", function () {
                                deleteItem(item.id);
                            })
                        )
                    );

                tr.appendTo(tBody);
            });

            todos = data;
        }
    });
}

function add() {
    const transportadora = {
        nome: $("#add-nome").val(),
        cnpj: $("#add-cnpj").val(),
        inscricaoEstadual: $("#add-inscricao-estadual").val(),
        latitude: $("#add-latitude").val(),
        longitude: $("#add-longitude").val()
    };
    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(transportadora),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error!");
        },
        success: function (result) {
            getData();
            $("#add-nome").val("");
            $("#add-cnpj").val("");
            $("#add-inscricao-estadual").val("");
            $("#add-latitude").val("");
            $("#add-longitude").val("");
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(todos, function (key, item) {
        if (item.id === id) {
            $("#edit-id").val(item.id);
            $("#edit-nome").val(item.nome);
            $("#edit-cnpj").val(item.cnpj);
            $("#edit-inscricao-estadual").val(item.inscricaoEstadual);
            $("#edit-latitude").val(item.latitude);
            $("#edit-longitude").val(item.longitude);
        }
    });
    $("#editar-transportadora").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const transportadora = {
        id: $("#edit-id").val(),
        nome: $("#edit-nome").val(),
        cnpj: $("#edit-cnpj").val(),
        inscricaoEstadual: $("#edit-inscricao-estadual").val(),
        latitude: $("#edit-latitude").val(),
        longitude: $("#edit-longitude").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(transportadora),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#editar-transportadora").css({ display: "none" });
}