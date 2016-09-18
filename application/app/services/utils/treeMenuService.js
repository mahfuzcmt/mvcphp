
'use strict';


define(['app'], function (app) {

    var treeMenuService = function ($rootScope) {
     var MenuJSON = '';
    	
        this.getValue = function(){
        	return MenuJSON;
        }        
        
        this.setTreeMenu = function(JSONData){
        	function addItem(parentUL, branch) {
			    for (var key in branch.children) {
			        var item = branch.children[key];
			        var itemList = $('<li>', {
			            id: "item" + item.id
			        });
			        itemList.append($('<input>', {
			            type: "checkbox",
			            id: "item" + item.id,
			            name: "item" + item.id,
			            style: "cursor: pointer;",
			        }));
			        itemList.append($('<label>', {
			            for: "item" + item.id,
			            text: item.text
			        }));
			        parentUL.append(itemList);
			        if (item.children) {
			            var $ul = $('<ul>', {
			                style: 'display: none'
			            }).appendTo(itemList);
			            itemList.append();
			            addItem($ul, item);
			        }
			    }
			}

			$(function () {
				var data = JSONData;
			    addItem($('#root'), data);
			    chkboxClick(data);
			});
        }
        
        var chkboxClick = function (data){
        	$(':checkbox').change(function () {
		    	
		    	$(this).closest('li').children('ul').find(':checkbox').trigger('click');
		    	$(this).closest('li').children('ul').children('li').children('ul').find(':checkbox').trigger('click');
		        $(this).closest('li').children('ul').slideToggle();
		        
		        //  Core object (WebMenu,Desktop, Report)
		        var obj = data.children;
		        
		        for(var i=0; i< obj.length; i++){
		        	if("item"+obj[i].id == this.id){
		    			if(obj[i].enable == false){
		    				obj[i].enable = true;
		    			}
		    			else if(obj[i].enable == true){
		    				obj[i].enable = false;
		    			}
		    		}
		        	
		        	else {
		        		if(obj[i].children != undefined){
		        			for(var a=0; a< obj[i].children.length; a++){
					        	if("item"+obj[i].children[a].id == this.id){
					        		if(obj[i].children[a].enable == false){
					        			obj[i].children[a].enable = true;
					    			}
					        		
					    			else if(obj[i].children[a].enable == true){
					    				obj[i].children[a].enable = false;
					    			}
					        	}
					        	else{
					        		if(obj[i].children[a].children != undefined){
					        			for(var b=0; b< obj[i].children[a].children.length; b++){
								        	if("item"+obj[i].children[a].children[b].id == this.id){
								        		if(obj[i].children[a].children[b].enable == false){
								        			obj[i].children[a].children[b].enable = true;
								        		}
								        		else if(obj[i].children[a].children[b].enable == true){
								        			obj[i].children[a].children[b].enable = false;
								        		}
								        	}
								        	
								        	else{
								        		if(obj[i].children[a].children[b].children != undefined){
							        			for(var c=0; c< obj[i].children[a].children[b].children.length; c++){ 
							        				if("item"+obj[i].children[a].children[b].children[c].id == this.id){
										        		if(obj[i].children[a].children[b].children[c].enable == false){
										        			obj[i].children[a].children[b].children[c].enable = true;
										        		}
										        		else if(obj[i].children[a].children[b].children[c].enable == true){
										        			obj[i].children[a].children[b].children[c].enable = false;
										        		}
										        	}
							        			}
							        		}
								        }
					        		}
					        	}
					       }
					   }
		        	}
				}	
			};
			MenuJSON = JSON.stringify(data);
		    });
        }
    };
    
    app.service('treeMenuService', ['$rootScope', treeMenuService]);

});

