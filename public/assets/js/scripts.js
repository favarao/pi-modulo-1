
    function calcula() {
        var valor = document.getElementById("valor").value;
        var quantidade = document.getElementById("quantidade").value;
        var restantes = document.getElementById("restantes").value;
        if(quantidade<0 || quantidade>restantes)
        {
            document.getElementById("total").value ='';
            alert("Valor invalido");

            return;
        }
        
        document.getElementById("total").value = valor * quantidade;        
    }