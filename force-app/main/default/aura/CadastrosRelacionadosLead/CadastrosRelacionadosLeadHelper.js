({
    dispararEvento: function(component, event, numeroCadastro){
       
        let evento = $A.get("e.c:SetaValorNumeroCadastroEvt");
 		
        evento.setParams({"numeroCasdastro" :  numeroCadastro});
        evento.fire();
    },
})