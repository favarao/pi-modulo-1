
    function calcula() {
        var valor = parseInt(document.getElementById("valor").value);
        var quantidade = parseInt(document.getElementById("quantidade").value);
        document.getElementById("quantidade").value = quantidade;
        var restantes = parseInt(document.getElementById("restantes").value);
        if(quantidade<0 || quantidade>restantes)
        {
            document.getElementById("total").value ='';
            alert("Valor invalido");

            return;
        }
        
        document.getElementById("total").value = valor * quantidade;        
    }