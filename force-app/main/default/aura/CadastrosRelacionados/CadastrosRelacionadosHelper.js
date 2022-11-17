({
    apexMethod: function (component, method, params) {
        return new Promise(function (resolve, reject) {
            
            const action = component.get('c.' + method)
            
            action.setParams(params);
            
            action.setCallback(this, function (response) {
                const state = response.getState()
                if (state === "SUCCESS") {
                    resolve(response.getReturnValue())
                } else if (state === "INCOMPLETE") {
                    console.log("Operação incompleta, verifique o log do back-end")
                } else if (state === "ERROR") {
                    
                    const errors = response.getError();
                    
                    if (errors && errors[0] && errors[0].message) {
                        console.log("Mensagem de erro: " + errors[0].message);
                        reject(errors[0].message);
                    } else {
                        console.log("Erro desconhecido");
                        reject("Erro desconhecido");
                    }
                }
            })
            
            $A.enqueueAction(action);
        })
    },
    
    SOQL: function (component, query) {
        return this.apexMethod(component, 'executarSOQL', {query: query});
    },
    
    setarDadosTabela: function (component, result){
        const nomeTabela = component.get('v.iconName');
        
        let records = result;
        const tamanhoLista = Object.keys(records).length;
        component.set('v.listSize', tamanhoLista);
        
        if(tamanhoLista > 0)
        {
            records.forEach(function(record){
                record.linkName = '/'+record.Id;
            });
            
            if(nomeTabela === "standard:opportunity")
            {   
                records.forEach(function(record){
                    record.accountName = record.Account.Name;
                    record.accLinkName = '/'+record.AccountId;
                });  
            }
            
            component.set('v.data', records); 				    
        }
        component.set('v.loaded', false);
    }, 
})