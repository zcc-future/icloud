var app=angular.module("remainder",[]);
  app.directive("ngX",[function(){
     	return{
     		restrict:'A',
     		template: ' <div class="lists"><div ng-transclude></div></div>' ,
     		replace:true,
     		transclude:true,
     		link:function($scope,el){
     			$(el).on("keyup",false);
     			$(".inpu").on("keyup",false);
     			$(".xiangqing").on("keyup",false);
     			$(el).on("click",".list1",function(){
     				$(el).find(".list1").find(".list1-neirong").removeClass("active")
     				$(el).find(".list1").find(".row-bottom").css("left",44);
     				$(el).find(".list1").find(".row-top").hide();
     				$(this).find(".list1-neirong").addClass("active")
     				$(this).find(".list1-inner").find(".row-bottom").css("left",0);
     				$(this).find(".list1-inner").find(".row-top").show().css("left",0);
     				$(".plan").removeClass("active");
     				var that=this;
     				$scope.$apply(function(){
     					$scope.cu=$(that).index();
     				})
     				for(var i=0;i<7;i++){
     					$(".line1 .xian-top1").removeClass($scope.Lists[i].theme)
	     				$(".line1 .xian-bottom1").removeClass($scope.Lists[i].theme)
	     				$(".line1 .bgcolor").removeClass($scope.Lists[i].theme)
     				}
     			});
     			$(document).on("keyup",function(e){
     				if(e.keyCode===8){
     					var index=$(".active").index();
     					if(index==-1){
     						return -1;
     					}
     					$scope.$apply(function(){
     						$scope.Lists.splice(index,1);
     						$scope.save();
     					})
     				}

     			})
     			$(document).on("keyup",".line1",function(e){			
					if(e.keyCode==8||e.keyCode==46){
						var a=$(".line1 .inpu").val();
						var b;
						$scope.Lists[$scope.cu].todos.forEach(function(v,i){
								if(v.name==a){
									b=i
								}
							})
						
						$scope.$apply(function(){
							$scope.Lists[$scope.cu].todos.splice(b,1);
								
						})
					}
					return false;
				});
     			$(".line1-list").on("click",".line1",function(){
     				console.log(this)
     				var index=$(".line1").index($(this));
     				$(".line1 .xian-top1").removeClass($scope.Lists[$scope.cu].theme)
     				$(".line1 .xian-bottom1").removeClass($scope.Lists[$scope.cu].theme)
     				$(".line1 .bgcolor").removeClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .xian-top1").eq(index).addClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .xian-bottom1").eq(index).addClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .bgcolor").eq(index).addClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .mes").hide();
                    $(".line1 .mes").eq(index).show();
     			})
//   			$(document).on("click",".mes",function(){
//
//   				$(".xiangxi-box").show();
//   			})
     		}
     	}}])
  app.directive("xiangqing",[function(){
     	return{
     		restrict:'A',
     		template: ' <div class="xiangqing-box"><div ng-transclude></div></div>' ,
     		replace:true,
     		transclude:true,
     		link:function($scope,el){
     			$(".line1-list").on("click",".line1",function(){
     				var index=$(".line1").index($(this));
     				$(".line1 .xian-top1").removeClass($scope.Lists[$scope.cu].theme)
     				$(".line1 .xian-bottom1").removeClass($scope.Lists[$scope.cu].theme)
     				$(".line1 .bgcolor").removeClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .xian-top1").eq(index).addClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .xian-bottom1").eq(index).addClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .bgcolor").eq(index).addClass($scope.Lists[$scope.cu].theme)
                    $(".line1 .mes").hide();
                    $(".line1 .mes").eq(index).show();
     			})
     			$(".clear").on("click",function(){
     				$(".clearall").show();
     				$(".zhezhao").show();
     			})
     			$(".remove").on("click",function(){
     				$(".clearall").hide();
     				$(".zhezhao").hide();
     			})
     			$(".qingwan").on("click",function(){
     				$(".clearall").hide();
     				$(".zhezhao").hide();
     			})
     			$(".cheng").on("click",function(){
     				$(".xiangxi-box").hide();
     			})

     		}
     	}}])      
  app.controller('mainCtrol',['$scope',function($scope){
		$scope.Lists=[];
		$scope.cu=0;
		$scope.colors=["purple","green","blue","yellow","brown","red","orange"];
		if(localStorage.remainder){
			$scope.Lists=JSON.parse(localStorage.remainder)
		}else{
			$scope.Lists=[{
		     name:"新列表",
             id:1001,
             theme:"purple",
             todos:[
             {name:"三国",state:0,id:1},
             {name:"水浒",state:1,id:2}
             ]
			}
            
			];
		}
		$scope.save=function(){
			localStorage.remainder=JSON.stringify($scope.Lists);
		}
		function maxid(){
			var max=-Infinity;
			for(var i=0;i<$scope.Lists.length;i++){
				var v=$scope.Lists[i];
				if(v.id>max){
					max=v.id
				}
			}
			return (max==-Infinity)?1000:max;
		}
		function hasid(){
			var max=-Infinity;
			for(var i=0;i<$scope.Lists[$scope.cu].todos.length;i++){
				var v=$scope.Lists[$scope.cu].todos[i];
				if(v.id>max){
					max=v.id
				}
			}
			return (max==-Infinity)?1:max;
		}
		$scope.addlist=function(){
			var len=$scope.Lists.length;
			var index=len%7;
			var v={
				id:maxid()+1,
				name:"新列表"+(len+1),
				theme:$scope.colors[index],
				todos:[]
			}
			$scope.Lists.push(v);
		}
		$scope.chbg=function(e){
		   $(".plan").toggleClass("active");
		   $(".list1-neirong").removeClass("active");	
		}
		$scope.remove=function(index){
			$scope.Lists.splice(index,1)
		}
		$scope.addtodos=function(){
			var value=$(".input3").val();
			$scope.Lists[$scope.cu].todos.push({name:value,state:0});
			value="";
		}
		$scope.count=function(){
			var r=0;
			$scope.Lists[$scope.cu].todos.forEach(function(v,i){
			 if(v.state==1){
			   r++;
			  }
			})
			return r;
		}
		$scope.clear=function(){
			var arr=[];
            $scope.Lists[$scope.cu].todos.forEach(function(v,i){
		    if(v.state==0){
		       arr.push(v)
		    }
	       $scope.Lists[$scope.cu].todos=arr;
          })
		}
		$scope.shanchu=function(index){
			$scope.Lists[$scope.cu].todos.splice(index,1);
		}
	}])
  app.directive("sel",[function(){
	 	return{
	 		restrict:'A',
	 		template: ' <div class="select"><div ng-transclude></div></div>' ,
	        replace:true,
	        transclude:true,
	        link:function($scope,el){
	          $(el).on("click",function(){
	          	$(".xuanxiang").toggle();
	          	return false;
	          })
	          $(document).on("click",function(){
	          	$(".xuanxiang").hide();
	          })
	          $(".quxiao").on("click",function(){
	          	$(".xuanxiang").hide();
	          })
	          $(".xuanxiang").on("click",false);
	          $(".button .img").on("click",function(){
	          	$(".button .img").toggleClass("huan");
	          	$(".line1-box").toggle();
	          	$(".kongbai").toggle();
	          	$("#one").toggle();
	          	$(".clear").toggle();
	          })
	        }
	 	}}])