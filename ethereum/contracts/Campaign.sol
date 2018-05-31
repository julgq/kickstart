pragma solidity ^0.4.17;

contract CampaignFactory {
    /* Array de direcciones de contratos hechos deploy */
    address[] public deployedCampaigns;
    
    /* Deploy de una nueva campaña y guardar el resultado de la direccion */
    /* Genera una instancia del contract Campaign */
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    /* Returns de la lista completa de todas las campañas */
    /* view, significa que esta funcion no se ningun cambio de información, cambio de data */
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}
contract Campaign   {
    
    struct Request {
        
        /* Descripcion de porque se requiere un request de salida */
        string description; 
        
        /* Valor en ETH de lo que se requiere el Request */
        uint value;
        
        /* Direccion de el proveedor */
        address recipient;
        
        /* true or false del status de el Request */
        bool complete;
        
        /* Numero de votos de aceptacion de uso de dinero */
        uint approvalCount;
        
        /* tru or false de los que votaron */
        mapping(address => bool) approvals;
    }
    
    /* Array de Request */
    Request[] public requests;
   
    /* Who is working with the money? */
    address public manager;
    
    /* Inicializar: Minimo contribucion del inversor */
    uint public minimumContribution;
    
    /* Lista de direcciones de personas que donaran dinero */
    mapping(address => bool) public approvers;
    
    /* Contador de donadores */
    uint public approversCount;
    
    
    /* Modificador de funcion, solo se ejecuta en caso de ser el administrador */
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    /* Funcion constructora */
    constructor(uint minimum, address creator) public payable {
        
        /* Quien es el creador del contrato */
        /* manager = msg.sender; */
        manager = creator;
        
        minimumContribution = minimum;
    }
    
    /* Funcion para enviar dinero a la campaña */
    function contribute()  public payable {
        /* Para que se ejecute esta funcion, el valor enviado de la donacion debe ser mayor a la cantidad minima de contribucion */
        require(msg.value > minimumContribution);
        
        /* Agregar la direccion de quien dona dinero al mapping, [solo se guarda el bool no la direccion] */
        approvers[msg.sender] = true;
        
        /* Agregar +1 al contador de donadores */
        approversCount++;
        
    }
    
    
    /* 
        Funcion con el modificador restricted activado, 
        esta funcion genera una solicitud de uso de dinero 
    */
    function createRequest(string description, uint value, address recipient) 
        public restricted {
            
            /* Instancia de Request */
            Request memory newRequest = Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            });
            requests.push(newRequest);
        }
    
    
    /* Esta funcion genera un voto y aprueba  el Request de gasto */
    function approveRequest(uint index) public {
        
        /* 
        Para no hacer busquedas frecuentes al mapping, 
        generamos una instancia tipo storage del Request en funcion
        
        */
        
        Request storage request = requests[index];
        
        /* Esta funcion solo la puede ejecutar un donador */
        require(approvers[msg.sender]); /* Si es true entra */
        
        /* Que el votante o donador no haya votado antes este request */
        require(!request.approvals[msg.sender]);
        
        /* Se genera la votacion en este caso se acepta */
        request.approvals[msg.sender] = true;
        
        /* Se incrementa en 1 el conteo de la votacion */
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint index) public restricted {
        /* Crear una instancia del request que se esta operando */
        Request storage request = requests[index];
        
        /* El numero de votos es mayor al 50% de los donadores  */
        require(request.approvalCount > (approversCount/2) );
        
        /* Verificar que esta funcion solo se ejecute si el request aun no esta completado o = true */
        require(!request.complete);
        
        /* Enviar dinero del request al proveedor */
        request.recipient.transfer(request.value);
        
        /* Finalizar Request */
        request.complete = true;
        
        
        
        
    }
}

