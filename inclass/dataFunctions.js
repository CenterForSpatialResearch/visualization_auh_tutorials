     function sortByColumn(column, data){
         data.sort(function(item1, item2){
             return item1[column]-item2[column]
         })
         
         return data
     } 