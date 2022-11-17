({
    preencherTabela: function (component, event, helper) {
        
        component.set('v.iconName', "standard:account");
        component.set('v.tableTitle', "Contas");
         
        const numeroCadastro = event.getParam('numeroCasdastro');
        if(!numeroCadastro){
            component.set('v.loaded', false);
            return;
        }
        
        component.set('v.columns', [
            {label: 'Nome completo', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, tooltip: { fieldName: 'Name'} }},
            {label: 'Tipo', fieldName: 'Type', type: 'text', editable: false},            
 			{label: 'Phone', fieldName: 'Phone', type: 'text', editable: false},
            {label: 'Número do Cadastro', fieldName: 'NumeroCadastro__c', type: 'text', editable: false},
            
        ]);
		
        const recordId = component.get('v.recordId');  
          
        const query = `SELECT Id, Name, Type, Phone, NumeroCadastro__c 
            		   FROM Account WHERE NumeroCadastro__c = '${numeroCadastro}' 
            		   ORDER BY Name DESC`;
            
         helper.SOQL(component, query).then(function(result){
         	helper.setarDadosTabela(component, result);
            
         }).catch(function (error) {
            console.error(error)
         })
    },
 
})