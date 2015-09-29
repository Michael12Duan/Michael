var proListModule = angular.module("routerApp.ProListModule", ['routerApp.services']);
proListModule.controller('ProListCtrl',function($scope,$http,$state,$stateParams,$filter,filterService,uiGridConstants) {

  //corsproxy
  var base = 'http://kd90zc-pc:1337';
  //filter
  $scope.filterService = filterService;
      //文件上传
    //   $scope.uploadFinished = function(e, data) {
    //      console.log('We just finished uploading this bady...');
    // };
    //sort gird
    var today = new Date();
      var nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
        if( col.filters[0].term ){
          return 'header-filtered';
        } else {
          return '';
        }
      };
      $scope.gridConstants = {
        enableFiltering: true,
        onRegisterApi: function(gridApi){
          $scope.gridApi = gridApi;
        },
        columnDefs: [
          // default
          { field: 'name', headerCellClass: $scope.highlightFilteredHeader },
          // pre-populated search field
          { field: 'gender', filter: {
              term: '1',
              type: uiGridConstants.filter.SELECT,
              selectOptions: [ { value: '1', label: 'male' }, { value: '2', label: 'female' }, { value: '3', label: '特点3'}, { value: '4', label: '特点4' }, { value: '5', label: '特点5' } ]
            },
            cellFilter: 'mapGender', headerCellClass: $scope.highlightFilteredHeader },
          // no filter input
          { field: 'company', enableFiltering: true, filter: {
            noTerm: true,
            condition: function(searchTerm, cellValue) {
              return cellValue.match(/a/);
            }
          }},
          // specifies one of the built-in conditions
          // and a placeholder for the input
          {
            field: 'email',
            filter: {
              condition: uiGridConstants.filter.ENDS_WITH,
              placeholder: 'ends with'
            }, headerCellClass: $scope.highlightFilteredHeader
          },
          // custom condition function
          {
            field: 'phone',
            filter: {
              condition: function(searchTerm, cellValue) {
                var strippedValue = (cellValue + '').replace(/[^\d]/g, '');
                return strippedValue.indexOf(searchTerm) >= 0;
              }
            }, headerCellClass: $scope.highlightFilteredHeader
          },
          // multiple filters
          { field: 'age', filters: [
            {
              condition: uiGridConstants.filter.GREATER_THAN,
              placeholder: 'greater than'
            },
            {
              condition: uiGridConstants.filter.LESS_THAN,
              placeholder: 'less than'
            }
          ], headerCellClass: $scope.highlightFilteredHeader},
          //date filte
          { field: 'mixedDate', cellFilter: 'date', width: '15%', filter: {
              condition: uiGridConstants.filter.LESS_THAN,
              placeholder: 'less than',
              term: nextWeek
            }, headerCellClass: $scope.highlightFilteredHeader
          },
          { field: 'mixedDate', displayName: "Long Date", cellFilter: 'date:"longDate"', filterCellFiltered:true, width: '15%',
          }
        ]

      };
      $http.get('/data/500_complex.json')
        .success(function(data,status) {
          $scope.gridConstants.data = data;                                            
          $scope.gridConstants.data[0].age = -5;
           //console.log(data)
          //console.log(status)
          data.forEach( function addDates( row, index ){
          row.mixedDate = new Date();
          row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
          row.gender = row.gender==='male' ? '1' : '2';
           });
        });


        $scope.toggleFiltering = function(){
           $scope.gridConstants.enableFiltering = !$scope.gridConstants.enableFiltering;
           $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      };

      


    //监听loginRequired事件
    // $scope.$on('event:loginRequired',function(){
    //   $location.path('/login')
    // })
   // $scope.errorService = ErrorService;
    //设置搜索功能
     // $scope.data= [{index:'1',name:'王老吉',person:'张敏',price:'54',action:''},
     //                 {index:'2',name:'面包',person:'Manny Rui',price:'44',action:''},
     //                 {index:'3',name:'火腿肠',person:'孔域',price:'54',action:''},
     //                 {index:'4',name:'生米',person:'胡风',price:'58',action:''},
     //                 {index:'5',name:'方便面',person:'叶凌',price:'74',action:''},
     //                 {index:'6',name:'油条',person:'越凌',price:'44',action:''},
     //                 {index:'7',name:'报纸',person:'叶小',price:'942',action:''},
     //                 {index:'8',name:'包子',person:'黄宾',price:'14',action:d'},
     //                 {index:'9',name:'酱油',person:'小花',price:'44',action:''},
     //                 {index:'10',name:'酸奶',person:'太阳',price:'294',action:''},
     //                 {index:'11',name:'矿泉水',person:'皮欢',price:'56',action:''},
     //                 {index:'12',name:'啤酒',person:'黄明',price:'20',action:''},
     //                 {index:'13',name:'雨伞',person:'愿望',price:'10',action:''},
     //                 {index:'14',name:'上衣',person:'姜晓',price:'38',action:''}]
    $scope.user = {
        email: '',
        name:'weitooAdmin',
        proName:'王老吉',
        pwd: '',
        autoLogin: false
    };
    $scope.submitForm = function(){
        $scope.message = '谢谢, ' + $scope.user.email + ', 你已经登录到我们的系统！';
         //$scope.submitted = true;
    };
    $scope.submit = function (){
        alert("please complete login function...");
    };
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [15, 30, 45],
        pageSize: 15,
        currentPage: 1
    };
    
    //设置获取online商品类型分页方法
    $scope.setPageOnlineCommodity= function(OnlineComData,page,pageSize){
      var arry =  $.map((OnlineComData),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
        var pagedData = arry[0].slice((page - 1) * pageSize, page * pageSize);
        $scope.onlinedatas = pagedData;
        $scope.totalServerItems = OnlineComData.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    //获取燕麦云盘
    // $scope.setPagingOatos= function(OatosData,page,pageSize){
    //   var arry =  $.map((OatosData),function(value,index){
    //           return [value]
    //     })
    //    arry = arry.slice(1)
    //    var arr = []
    //    for(i = 0;i<arry.length;i++){
    //      arr = arry[i]
    //    }
    //    arry =  $.map((arr),function(value,index){
    //           return [value]
    //     })
    //     var pagedData = arry[0].slice((page - 1) * pageSize, page * pageSize);
    //     $scope.oatos = pagedData;
    //     $scope.totalServerItems = OatosData.length;
    //     if (!$scope.$$phase) {
    //         $scope.$apply();
    //     }
    // }
    //获取商品类型分页设置
    $scope.setGetCommodityCategory = function(comCatDt, page, pageSize) {
        //将对象转换为数组
       var arry =  $.map((comCatDt),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
        var pagedData = arry[0].slice((page - 1) * pageSize, page * pageSize);
        $scope.comCats = pagedData;
        $scope.totalServerItems = comCatDt.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    //获取商品分页设置
    $scope.setPagingData = function(dt, page, pageSize) {
        //将对象转换为数组
       var arry =  $.map((dt),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
        var pagedData = arry[0].slice((page - 1) * pageSize, page * pageSize);
        $scope.ports = pagedData;
        $scope.totalServerItems = dt.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    //获取公共区域分页设置
    $scope.setOpenAreaData = function(openDt,page,pageSize){
      var arry = $.map((openDt),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
        var pagedData = arry[1].slice((page - 1) * pageSize, page * pageSize);
        $scope.oa = pagedData;
        $scope.totalServerItems = openDt.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
     }
     //设置黑名单列表
     $scope.setPageBlackList = function(blackListData,page,pageSize){
        var arry = $.map((blackListData),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
        var pagedData = arry[0].slice((page - 1) * pageSize, page * pageSize);
        $scope.bldata = pagedData;
        $scope.totalServerItems = blackListData.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
     }

     $scope.setPageCodeImg = function(codeImg,page,pageSize){
       var arry = $.map((codeImg),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
       console.log("-------------------arryimg------------------")
       console.log(arry)
        var pagedData = arry.slice((page - 1) * pageSize, page * pageSize);
        $scope.codImgs = pagedData;
        $scope.totalServerItems = codeImg.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
     }

     //属性分页设置
     $scope.setPageProperty = function(Props,page,pageSize){
      var arry = $.map((Props),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
       console.log("--------------arryprops--------------")
       console.log(arry)
       console.log("-----------arry[0]-------------")
       console.log(arry[0])
        var pagedData = arry.slice((page - 1) * pageSize, page * pageSize);
        $scope.propsdata = pagedData;
        $scope.totalServerItems = Props.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
     }
    //获取公共图片分页
    $scope.setPagePublicPics = function(publicPics,page,pageSize){
       var arry = $.map((publicPics),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
       console.log("--------------arryprops--------------")
       console.log(arry)
       console.log("-----------arry[0]-------------")
       console.log(arry[0])
        var pagedData = arry.slice((page - 1) * pageSize, page * pageSize);
        $scope.publicpicDatas = pagedData;
        $scope.totalServerItems = publicPics.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    //登录
    $scope.setPageLogin = function(logPages,page,pageSize){
        var arry = $.map((logPages),function(value,index){
              return [value]
        })
       arry = arry.slice(1)
       var arr = []
       for(i = 0;i<arry.length;i++){
         arr = arry[i]
       }
       arry =  $.map((arr),function(value,index){
              return [value]
        })
       console.log("--------------arryprops--------------")
       console.log(arry)
       console.log("-----------arry[0]-------------")
       console.log(arry[0])
        var pagedData = arry.slice((page - 1) * pageSize, page * pageSize);
        $scope.logDatas = pagedData;
        $scope.totalServerItems = logPages.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    

     //读取接口集合
     $scope.getInterface = function(){
            var url='/data/interface.json';
                $http(
                    {method:'GET',
                    url,
                   // data: {'grant_type':'client_credentials'},
                   // data:{'shopId':'1000001','page':'0','limit':'1000','keyword':''},
                    status
                    }).success(function(idata,status) {
                      console.log("----------------idata in interface-----------")
                      console.log(idata)
                    $scope.setInterface(idata)
                    }).error(function(idata,status){
                        console.log('error'+status)
                    })
     }

    console.log($stateParams)
    $scope.setInterface = function(ifaceInfo){
      var _object = $filter('filter')(ifaceInfo[$stateParams.proType]);
        console.log("----------------_object---------------")
        console.log(_object)
         var s_object = $filter('filter')(_object.url)//[5] 比如说可以取对象里面url中的第5个字符，去掉就可以取出全部的url
         console.log("---------------s_object-------------")
         console.log(s_object)
         $scope.s_object = s_object;
     }
        //测试接口管理文件
    //$scope.getInterface();


     //var idata = $scope.idata
    // console.log("-------------idata------------------")
    // console.log($scope.idata)
     //设置过滤接口条件
      // var lookup = {};
      //  for (var i = 0, len = idata.length; i < len; i++) {
      //      lookup[idata[i].id] = idata[i];
      //  }
    // var result = $.grep($scope.idata, function(e){ return e.id == id; });
    //console.log("------------lookup-------------------")
    //console.log(lookup[0])
      

     //测试gridConstants 
     // $scope.gridCons  = function(){
     //     var url='/data/500_complex.json';
     //            $http(
     //                {method:'GET',
     //                url,
     //                data: {'grant_type':'client_credentials'}
     //                status
     //                }).success(function(dts) {
     //                  $scope.gridConstants.dts = dts;
     //                  $scope.gridConstants.dts[0].age = -5;
     //                  dts.forEach( function addDates( row, index ){
     //                    row.mixedDate = new Date();
     //                    row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
     //                    row.gender = row.gender==='male' ? '1' : '2';
     //                   });
     //                }).error(function(dts,status){
     //                    console.log('error'+status)
     //                })
     // }
     //getOnlineCommodity
     // $scope.getOnlineCommodity = function(pageSize,page){
     //        var url= base+'/api.weitoo.com:80/server/sc/commodity/getOnlineCommodity';
     //            $http(
     //                {method:'POST',
     //                url,
     //                data: {'grant_type':'client_credentials'},
     //                data:{'shopId':'1000001','page':'0','limit':'1000','keyword':''},
     //                status
     //                }).success(function(largeLoad) {
     //                  $scope.setPageOnlineCommodity(largeLoad,page, pageSize);
     //                }).error(function(largeLoad,status){
     //                    console.log('error'+status)
     //                })
     // }
     //燕麦云盘接口
     // $scope.getOatos = function(pageSize,page){
     //        var url='http:// kd90zc-pc:1337/app.oatos.com/os/java/sc/file/getFiles';
     //            $http(
     //                {method:'POST',
     //                url,
     //                data: {'grant_type':'client_credentials'},
     //                status
     //                }).success(function(largeLoad) {
     //                    $scope.setPagingOatos(largeLoad,page, pageSize);
     //                }).error(function(largeLoad,status){
     //                    console.log('error'+status)
     //                })
     // }
     //获取商品类型
     // $scope.getCommodityCategory = function(pageSize,page){
     //        var url=base+'/api.weitoo.com/server/sc/commodity/getCommodityCategory';
     //            $http(
     //                {method:'POST',
     //                url,
     //                data: {'grant_type':'client_credentials'},
     //                status
     //                }).success(function(largeLoad) {
     //                    $scope.setGetCommodityCategory(largeLoad,page, pageSize);
     //                }).error(function(largeLoad,status){
     //                    console.log('error'+status)
     //                })
     // }
     //区域管理模块
     $scope.getPublicInterfaceData = function(pageSize,page){
          $http.get('/data/interface.json').success(function(idata){
            $scope.setInterface(idata)
            var url=base+$scope.s_object;
            console.log(url)
                $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    status
                    }).success(function(largeLoad) {
                        $scope.setOpenAreaData(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error'+status)
                    })

                $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    data: {'shopId': '1000001','limit':'1000','page':'1'},
                    status
                    }).success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error'+status)
                    })

                $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'}
                    //status
                    }).success(function(largeLoad) {
                        $scope.setGetCommodityCategory(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error')
                    })

                $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    data:{'shopId':'1000001','page':'0','limit':'1000','keyword':''},
                    status
                    }).success(function(largeLoad) {
                      $scope.setPageOnlineCommodity(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error'+status)
                    })

                $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    data:{'userType':'1','userId':'1063630','targetId':'1000001'},
                    status
                    }).success(function(largeLoad) {
                      $scope.setPageBlackList(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error'+status)
                    })

                $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    data:{'code':'testMike1'},
                    status
                    }).success(function(largeLoad) {
                      $scope.setPageCodeImg(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error'+status)
                    })

                $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    data:{'shopId':'1000001','property':'category_version'}
                   // status
                    }).success(function(largeLoad) {
                      $scope.setPageProperty(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error')
                    })

                 $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    data:{'shopId':'0','keyword':'6953252600051'}
                   // status
                    }).success(function(largeLoad) {
                      $scope.setPagePublicPics(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error')
                    })

                     $http(
                    {method:'POST',
                    url,
                    data: {'grant_type':'client_credentials'},
                    data:{'account':'13760215482','password':'123456','hashKey':'ec5cecbd80d6e1ac4a3219728c2aec77dd23c6debfe53072520c5a7a17424363','nonce':'6gc82d09zti06vcglbrk0q9azi5yf23i'}
                   // status
                    }).success(function(largeLoad) {
                      $scope.setPageLogin(largeLoad,page, pageSize);
                    }).error(function(largeLoad,status){
                        console.log('error')
                    })

              })
     }
     //获取商品
    // $scope.getCommodity= function(pageSize, page) {
    //     setTimeout(function() {
    //         var url=base+'/api.weitoo.com/server/sc/commodity/getCommodity';
    //             $http(
    //                 {method:'POST',
    //                 url,
    //                 data: {'grant_type':'client_credentials'},
    //                 data: {'shopId': '1000001','limit':1000,'page':1},
    //                 status
    //                 }).success(function(largeLoad) {
    //                     $scope.setPagingData(largeLoad, page, pageSize);
    //                 }).error(function(largeLoad,status){
    //                     console.log('error'+status)
    //                 })
    //     }, 100);
    // };

    //$scope.getCommodity($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    //$scope.getOpenArea($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    //$scope.getCommodityCategory($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    //$scope.getOnlineCommodity($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    $scope.getPublicInterfaceData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    //$scope.gridCons($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    //燕麦云盘
    // $scope.getOatos($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getCommodity($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getCommodity($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    //登录
    $scope.gridLog = {
      data:'logDatas',
       multiSelect: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs:[{
            field: 'account',
            displayName: '账号',
            width: 250,
            pinnable: true,
            enableCellEdit: true,
            sortable: true
        },{
           field: 'id',
            displayName: '序号',
            width: 250,
            pinnable: true,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'password',
            displayName: '密码',
            width: 250,
            pinnable: true,
            enableCellEdit: true,
            sortable: false
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions

    }
   


    //getCodeImg
    $scope.gridCodeImages = {
      data:'codImgs',
       multiSelect: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs:[{
            field: 'path',
            displayName: '路径',
            width: 250,
            pinnable: true,
            enableCellEdit: true,
            sortable: true
        },{
           field: 'id',
            displayName: '序号',
            width: 250,
            pinnable: true,
            enableCellEdit: true,
            sortable: false
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions

    }
    $scope.gridBlackList={
      data:'bldata',
      multiSelect: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs:[{
            field: 'address',
            displayName: '地址',
            width: 250,
            pinnable: true,
            enableCellEdit: true,
            sortable: true
        },{
           field: 'distance',
            displayName: '距离',
            width: 40,
            pinnable: true,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'id',
            displayName: '序号',
            width: 70,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'imageUrl',
            displayName: '图片地址',
            width: 590,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'lon',
            displayName: '经度',
            width: 70,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'lat',
            displayName: '纬度',
            width: 70,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'price',
            displayName: '价格',
            width: 40,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'range',
            displayName: '范围',
            width: 40,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'tel',
            displayName: '电话',
            width: 110,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    }

    $scope.gridCommodityCategory={
        data:'comCats',
        multiSelect: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs:[{
                 field: 'id',
            displayName: '序号',
            width: 70,
            pinnable: true,
            enableCellEdit: true,
            sortable: true
        },{
           field: 'name',
            displayName: '名称',
            width: 70,
            pinnable: true,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'order',
            displayName: '顺序',
            width: 70,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'parentId',
            displayName: '父序号',
            width: 70,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    }
    $scope.gridOpenAreas={
        data:'oa',
        multiSelect: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs:[{
                 field: 'id',
            displayName: '序号',
            width: 70,
            pinnable: true,
            enableCellEdit: true,
            sortable: true
        },{
           field: 'name',
            displayName: '城市',
            width: 70,
            pinnable: true,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'parentId',
            displayName: '父序号',
            width: 70,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        },{
           field: 'level',
            displayName: '级别',
            width: 70,
            enableCellEdit: true,
            pinnable: false,
            enableCellEdit: true,
            sortable: false
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    }

    $scope.gridOptions = {
        data: 'ports',
        rowTemplate: '<div style="height:100%">'+
                         '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
                           '<div class="ngVerticalBar" ng-style="{height:rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">' +
                         '</div>' +
                        '<div ng-cell>'+
                     '</div>' +
                     '</div>'+
                     '</div>',
        multiSelect: true,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs:[{
            field: 'id',
            displayName: '序号',
            width: 70,
            pinnable: true,
            enableCellEdit: true,
            sortable: true
        }, {
            field: 'name',
            displayName: '商品名称',
              width: 70,
            enableCellEdit: true
        }, {
            field: 'categoryName',
            displayName: '类型名称',
            enableCellEdit: true,
            width: 70
        }, {
            field: 'categoryId',
            displayName: '类型序号',
            enableCellEdit: true,
            width: 70
        }, {
            field: 'price',
            displayName: '商品价格',
            enableCellEdit: true,
            width: 80,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'barcode',
            displayName: 'barcode',
            enableCellEdit: true,
            width: 120
        },{
            field: 'stock',
            displayName: '库存',
            enableCellEdit: true,
            width: 50
        },{
            field: 'picPath',
            displayName: '路径',
            enableCellEdit: true,
            width: 330
        },{
            field: 'status',
            displayName: '状态',
            enableCellEdit: true,
            width: 50
        },{
            field: 'proId',
            displayName: '商品操作',
            enableCellEdit: true,
            sortable: false,
             width: 70,
            pinnable: true,
            cellTemplate: '<div><a ui-sref="prodetail({proId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
})
.filter('mapGender', function() {
      var genderHash = {
        1: 'male',
        2: 'female'
      };
     
      return function(input) {
        if (!input){
          return '';
        } else {
          return genderHash[input];
        }
      };
    });

proListModule.controller('FilterCtrl', function($scope, filterService) {
  $scope.filterService = filterService;
});

// proListModule.controller('RootCtrl', ['$scope','ErrorService' function($scope,ErrorService){
//   $scope.errorService = ErrorService;
  
// }])
/**
 * 这里是商品详情模块
 * @type {[type]}
 */
var proDetailModule = angular.module("routerApp.ProDetailModule", []);
proDetailModule.controller('ProDetailCtrl', function($scope, $http, $state, $stateParams) {
    //console.log($stateParams);
    //请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    $scope.showImge = '/image/logo.png'
});


