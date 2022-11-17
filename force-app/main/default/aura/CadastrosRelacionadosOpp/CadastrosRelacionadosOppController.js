({
    preencherTabela: function (component, event, helper) {
        
        component.set('v.iconName', "standard:opportunity");
        component.set('v.tableTitle', "Oportunidades");
        
        const numeroCadastro = event.getParam('numeroCasdastro');
        event.stopPropagation();
        if(!numeroCadastro){
            component.set('v.loaded', false);
            return;
        }
        
        component.set('v.columns', [
            {label: 'Nome da Oportunidade', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, tooltip: { fieldName: 'Name'}} },
            {label: 'Nome da Conta', fieldName: 'accLinkName', type: 'url', typeAttributes: {label: { fieldName: 'accountName' }, tooltip: { fieldName: 'accountName'}} },            
 			{label: 'Fase', fieldName: 'StageName', type: 'text', editable: false},
            {label: 'Número do Cadastro', fieldName: 'NumeroCadastro__c', type: 'text', editable: false},
            
        ]);

        const recordId = component.get('v.recordId');  
          
        const query = `SELECT Id, Name, AccountId, Account.Name, StageName, NumeroCadastro__c 
            			FROM Opportunity WHERE NumeroCadastro__c = '${numeroCadastro}' 
            			ORDER BY Name DESC`;
            
        helper.SOQL(component, query).then(function(result){
         	helper.setarDadosTabela(component, result);
            
        }).catch(function (error) {
            console.error(error)
        })
    },
})