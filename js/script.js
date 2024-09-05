function removerProduto(button) {
    const linha = button.closest('tr');
    document.querySelector("#incProd").style.display = 'block';

    const confirmar = confirm("Deseja realmente excluir este produto?");
    
    if (confirmar) {
        linha.remove();
    }
}

function buscarEnderecoPorCep() {
    const cepInput = document.querySelector('#cep');
    let cep = cepInput.value.replace("-", "");

    const camposParaLimpar = ['endereco', 'bairro', 'municipio', 'estado'];
    camposParaLimpar.forEach(campo => {
        document.querySelector(`#${campo}`).value = '';
    });

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    cepInput.value = data.cep;
                    document.querySelector('#endereco').value = data.logradouro;
                    document.querySelector('#bairro').value = data.bairro;
                    document.querySelector('#municipio').value = data.localidade;
                    document.querySelector('#estado').value = data.uf;
                } else {
                    alert('CEP não encontrado! Insira um CEP válido.');
                }
            });
    } else {
        alert('CEP inválido! O CEP deve ter pelo menos 8 dígitos.');
    }
}

function adicionarProduto() {
    const tabela = document.querySelector("#tabela_produtos tbody");
    const numProdutos = tabela.querySelectorAll("tr.produto").length + 1;
    const novaLinha = document.createElement("tr");
    novaLinha.classList.add("produto");

    novaLinha.innerHTML = `
        <td class="text-center align-middle">
            <button onclick="removerProduto(this)" class="btn btn-danger">
                <!-- Ícone de lixeira -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 17 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                </svg>
            </button>
        </td>
        <td>
            <div class="border rounded border-dark p-2">
                <h5>Produto ${numProdutos}</h5>
                <div class="row mt-3 mb-3">
                    <div class="col-md-2 d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#8ACE00" class="bi bi-box-seam-fill" viewBox="0 0 16 16" style="width: 80px; height: 80px;">
                            <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z"></path>
                        </svg>
                    </div>
                    <div class="col-md-10">
                        <label for="produto${numProdutos}" class="text-sm">Produto</label>
                        <input type="text" class="form-control" id="produto${numProdutos}" name="produto${numProdutos}" required>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="unidade_medida${numProdutos}" style="font-size: 13px">UND. Medida</label>
                                <select class="form-control" id="unidade_medida${numProdutos}" name="unidade_medida${numProdutos}" required>
                                    <option value="" selected></option>
                                    <option value="KG">KG</option>
                                    <option value="Unidade">Unidade</option>
                                    <option value="Caixa">Caixa</option>
                                    <option value="Pacote">Pacote</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="quantidade${numProdutos}" style="font-size: 13px">QTDE em Estoque</label>
                                <input type="number" class="form-control" id="quantidade${numProdutos}" name="quantidade${numProdutos}" min="0" required oninput="calcularTotal(${numProdutos})">
                            </div>
                            <div class="col-md-3">
                                <label for="valor_unitario${numProdutos}" style="font-size: 13px">Valor Unitário</label>
                                <input type="number" class="form-control" id="valor_unitario${numProdutos}" name="valor_unitario${numProdutos}" min="0" step="0.01" required oninput="calcularTotal(${numProdutos})">
                            </div>
                            <div class="col-md-3">
                                <label for="valor_total${numProdutos}" style="font-size: 13px">Valor Total</label>
                                <input type="number" class="form-control" id="valor_total${numProdutos}" name="valor_total${numProdutos}" readonly required>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>`;
    
    tabela.appendChild(novaLinha);
}

function calcularTotal(numProdutos) {
    const quantidade = document.getElementById(`quantidade${numProdutos}`).value;
    const valorUnitario = document.getElementById(`valor_unitario${numProdutos}`).value;
    const valorTotal = document.getElementById(`valor_total${numProdutos}`);

    valorTotal.value = (quantidade * valorUnitario).toFixed(2);
}

function validarCamposObrigatorios() {
    var camposObrigatorios = document.querySelectorAll('[required]');
    var camposNaoPreenchidos = [];
    var produtoAdicionado = document.querySelectorAll('#tabela_produtos .produto').length > 0;
    var anexoAdicionado = document.querySelectorAll('#tabela_anexos .anexo').length > 0;

    camposObrigatorios.forEach(function(campo) {
        if (!campo.value.trim()) {
            camposNaoPreenchidos.push(campo);
            campo.style.borderColor = 'red';
        } else {
            campo.style.borderColor = '';
        }
    });

    if (!produtoAdicionado) {
        alert('ATENÇÃO! Pelo menos um produto deve ser adicionado.');
        return false;
    }

    if (!anexoAdicionado) {
        alert('ATENÇÃO! Pelo menos um documento deve ser anexado.');
        return false;
    }

    if (camposNaoPreenchidos.length > 0) {
        var camposNomes = camposNaoPreenchidos.map(function(campo) {
            return campo.previousElementSibling.textContent.trim();
        });

        alert("Os seguintes campos são obrigatórios e não foram preenchidos:\n" + camposNomes.join('\n'));
        return false;
    }

    return true;
}

function salvarFornecedor() {
    if (!validarCamposObrigatorios()) {
        return;
    }

    $('#loadingModal').modal('show');

    var fornecedor = {
        razaoSocial: document.getElementById('razao_social').value,
        nomeFantasia: document.getElementById('nome_fantasia').value,
        cnpj: document.getElementById('cnpj').value,
        inscricaoEstadual: document.getElementById('inscricao_estadual').value,
        inscricaoMunicipal: document.getElementById('inscricao_municipal').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        municipio: document.getElementById('municipio').value,
        estado: document.getElementById('estado').value,
        contato: document.getElementById('contato').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        produtos: Array.from(document.querySelectorAll('#tabela_produtos .produto')).map(function (row, index) {
            return {
                descricaoProduto: row.querySelector(`#produto${index + 1}`).value,
                unidadeMedida: row.querySelector(`#unidade_medida${index + 1}`).value,
                qtdeEstoque: row.querySelector(`#quantidade${index + 1}`).value,
                valorUnitario: row.querySelector(`#valor_unitario${index + 1}`).value,
                valorTotal: row.querySelector(`#valor_total${index + 1}`).value
            };
        }),
        anexos: Array.from(document.querySelectorAll('#tabela_anexos .anexo')).map(function (row, index) {
            const nomeArquivo = row.querySelector('label.text-sm').textContent;
            return {
                nomeArquivo: nomeArquivo,
                blobArquivo: sessionStorage.getItem(`documentoBlobURL_${nomeArquivo}`) || ''
            };
        })
    };

    var dadosJSON = JSON.stringify(fornecedor, null, 2);

    setTimeout(function () {
        $('#loadingModal').modal('hide');
        console.log('Dados JSON:', dadosJSON);

        if (confirm('Os dados foram formatados em JSON. Deseja fazer o download do arquivo?')) {
            var blob = new Blob([dadosJSON], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'dados_fornecedor.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }, 1000);
}

function incluirAnexo() {
    var input = document.getElementById('documentoInput');
    var file = input.files[0];
    if (file) {
        var nomearquivo = file.name;
        var blob = new Blob([file], { type: file.type });
        var blobURL = URL.createObjectURL(blob);

        sessionStorage.setItem('documentoBlobURL_' + nomearquivo, blobURL);
        alert('Seu documento foi anexado com sucesso!');

        var novalinha = $("<tr>").addClass("anexo");
        var linha = "";
        linha += '    <td>';
        linha += '        <div class="border rounded border-dark p-2">';
        linha += '            <h5>Itens </h5>';
        linha += '            <div class="row mt-3 mb-3">';
        linha += '                <div class="col-md-1">';
        linha += '                    <button onclick="excluirAnexo(this)" id="teste_2" class="btn btn-danger">';
        linha += '                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 17 16">';
        linha += '                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zzm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 1 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>';
        linha += '                        </svg>';
        linha += '                    </button>';
        linha += '                </div>';
        linha += '                <div class="col-md-1">';
        linha += '                    <button onclick="visualizarDocumento(this)" class="btn btn-primary">';
        linha += '                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">';
        linha += '                            <path d="M16 8s-2.4-6-8-6S0 8 0 8s2.4 6 8 6 8-6 8-6zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>';
        linha += '                        </svg>';
        linha += '                    </button>';
        linha += '                </div>';
        linha += '                <div class="col-md-10">';
        linha += '                    <label class="text-sm">' + nomearquivo + '</label>';
        linha += '                </div>';
        linha += '            </div>';
        linha += '        </div>';
        linha += '    </td>';

        novalinha.html(linha);
        $('#tabela_anexos').append(novalinha);
    }
}

function excluirAnexo(button) {
    var nomeArquivo = $(button).closest('tr').find('label.text-sm').text();
    sessionStorage.removeItem('documentoBlobURL_' + nomeArquivo);
    $(button).closest('tr').remove();
}

function visualizarDocumento(button) {
    var nomeArquivo = $(button).closest('tr').find('label.text-sm').text();
    var blobURL = sessionStorage.getItem('documentoBlobURL_' + nomeArquivo);
    if (blobURL) {
        window.open(blobURL);
    } else {
        alert('Documento não encontrado.');
    }
}

document.getElementById('btnSalvarFornecedor').addEventListener('click', salvarFornecedor);
