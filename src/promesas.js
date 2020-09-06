var pedido = "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json"
var producto = "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json"
function resolver(producto, pedido) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        var req2 = new XMLHttpRequest();
        req2.responseType = 'json';
        req2.open('GET', pedido, true)
        req.responseType = 'json';
        req.open('GET', producto, true);
        req.onload = () => {
            if (req.status != 200) {
                reject("Falló");
            }
        }
        req2.onload = () => {
            if (req2.status == 200) {
                var x = req.response
                var y = req2.response;
                var max = 0;
                var maxProd = "ninguno";
                for (let i = 0; i < x.length; i++) {
                    var idProducto = x[i].idProducto;
                    var contador = 0;
                    for (let j = 0; j < y.length; j++) {
                        if (y[j].idProducto == idProducto) {
                            contador += parseInt(y[j].cantidad);
                            if (contador >= max) {
                                max = contador;
                                maxProd = x[i].nombreProducto;
                            }
                        }
                    }
                }
                resolve("El producto más pedido es: " + maxProd + "con: "+ max + " Pedidos");
            }
            else {
                reject("Falló");
            }
        }
        req.onerror = () => {reject(Error("Error de conexión"))};
        req2.onerror = () => { reject(Error("Error2"))}
        req.send();
        req2.send()
    });
}
resolver(producto,pedido).then(function(respuesta){
    console.log(respuesta)},
    function(error)
    {
        console.log(error);
    }
)

