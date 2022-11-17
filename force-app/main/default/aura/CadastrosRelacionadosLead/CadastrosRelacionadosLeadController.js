({
    preencherTabela: function (component, event, helper) {
        
        component.set('v.iconName', "standard:lead");
        component.set('v.tableTitle', "Leads");

        const numeroCadastro = component.get('v.leadRecord.NumeroCadastro__c');
        helper.dispararEvento(component, event, numeroCadastro);	
         
        if(!numeroCadastro){
            component.set('v.loaded', false);
            return;
        }
        
        component.set('v.columns', [
            {label: 'Nome completo', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, tooltip: { fieldName: 'Name'} } },
            {label: 'Empresa', fieldName: 'Company', type: 'text', editable: false},            
            {label: 'Status', fieldName: 'Status', type: 'text', editable: false},
            {label: 'Número do Cadastro', fieldName: 'NumeroCadastro__c', type: 'text', editable: false},
            
        ]);
 
         const recordId = component.get('v.recordId');  
       
         const query = `SELECT Id,  Name, Company, Status, NumeroCadastro__c 
            			FROM Lead WHERE Id != '${recordId}'
            			AND NumeroCadastro__c = '${numeroCadastro}' 
            			ORDER BY Status DESC`;
                        
         helper.SOQL(component, query).then(function(result){           
           helper.setarDadosTabela(component, result);
         }).catch(function (error) {
            console.error(error)
         }) 
    },
            
})