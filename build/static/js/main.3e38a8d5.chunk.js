(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5412:function(e,t,a){e.exports=a(5581)},5571:function(e,t,a){},5573:function(e,t,a){},5575:function(e,t,a){},5577:function(e,t,a){},5579:function(e,t,a){},5581:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(21),o=a.n(r),i=a(16),s=a(17),c=a(19),u=a(18),d=a(20),p=a(5),m=a(22),g=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isLoading:!1},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"login",value:function(){var e=this;this.setState({isLoading:!0}),setTimeout(function(){e.setState({isLoading:!1}),e.props.isLogged(!0)},2e3)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"loginContainer"},l.a.createElement("div",{className:"login"},l.a.createElement(m.d,{fontSize:"large",color:"primary"}),l.a.createElement(p.z,{className:"loginInput",label:"Username"}),l.a.createElement(p.z,{className:"loginInput",label:"Password",type:"password"}),l.a.createElement("div",{className:"loginRememberMe"},l.a.createElement(p.p,{className:"loginRememberMeLabel",style:{color:"#dedede"},control:l.a.createElement(p.c,{value:"checkedF",color:"primary"}),label:"Remember me"})),l.a.createElement(p.b,{className:"loginButton",variant:"contained",onClick:function(){return e.login()},color:"primary"},this.state.isLoading?l.a.createElement(p.d,{style:{color:"#ffffff"},size:24}):"Login")))}}]),t}(n.Component);var h=function(e){return l.a.createElement(p.m,null,l.a.createElement(p.o,{expandIcon:l.a.createElement(m.c,null)},l.a.createElement(p.B,null,e.panelHeading)),l.a.createElement(p.n,null,l.a.createElement(p.B,null,e.panelText)))},y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isLoading:!1,panels:[{panelHeading:"test1",panelText:"Lorem ipsum dolor sit amet"},{panelHeading:"test2",panelText:"Lorem ipsum dolor sit amet"},{panelHeading:"test3",panelText:"Lorem ipsum dolor sit amet"},{panelHeading:"test4",panelText:"Lorem ipsum dolor sit amet"},{panelHeading:"test5",panelText:"Lorem ipsum dolor sit amet"},{panelHeading:"test6",panelText:"Lorem ipsum dolor sit amet"},{panelHeading:"test7",panelText:"Lorem ipsum dolor sit amet"},{panelHeading:"test8",panelText:"Lorem ipsum dolor sit amet"}]},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"renderPanels",value:function(){return this.state.panels.map(function(e){return l.a.createElement(h,{panelHeading:e.panelHeading,panelText:e.panelText})})}},{key:"render",value:function(){return l.a.createElement("div",{className:"homeContainer"},this.renderPanels())}}]),t}(n.Component),b=a(142),f=a(143),v=a.n(f),E=function(e){function t(e){var a;Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleClose=function(){a.setState({open:!1}),a.props.onClose()};var n={};return a.props.fields.forEach(function(e){return n[e.name]=e.value}),a.state=Object.assign({},n,{selectedItems:[]}),console.log(a.props),a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"onChange",value:function(e){this.setState(Object(b.a)({},e.target.name,e.target.value))}},{key:"handleChangeSelectItem",value:function(e){this.setState({selectedItems:e})}},{key:"saveChanges",value:function(){this.props.onSave({type:this.props.type,fields:this.state})}},{key:"renderFields",value:function(){var e=this;return this.props.fields.map(function(t,a){return l.a.createElement(p.z,{key:a,autoFocus:!0,fullWidth:!0,margin:"dense",value:e.state[t.name],name:t.name,label:t.label,type:t.type,onChange:function(t){return e.onChange(t)}})})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(p.g,{open:this.props.open,"aria-labelledby":"form-dialog-title",className:this.props.className,fullWidth:!0,maxWidth:this.props.maxWidth},l.a.createElement(p.k,{id:"form-dialog-title"},this.props.dialogTitle),l.a.createElement(p.i,null,this.props.dialogText?l.a.createElement(p.j,null,this.props.dialogText):null,this.renderFields(),this.props.multiSelect&&l.a.createElement("div",{className:"modalBoxMultipleSelect"},l.a.createElement(v.a,{items:this.props.multiSelectItems,selectedItems:this.state.selectedItems,onChange:function(t){return e.handleChangeSelectItem(t)}}))),l.a.createElement(p.h,null,l.a.createElement(p.b,{onClick:this.handleClose,color:"primary"},"Cancel"),l.a.createElement(p.b,{onClick:function(){return e.saveChanges()},color:"primary"},this.props.submitButtonText))))}}]),t}(n.Component),k=a(54),x=a.n(k),C=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleClick=function(e){a.setState({anchorEl:e.currentTarget,open:!0})},a.handleClose=function(e){a.setState({anchorEl:null,open:!1}),a.props.onSelect(e)},a.state={options:a.props.options,anchorEl:null,open:!1},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state.anchorEl;return l.a.createElement(p.e,{onClickAway:function(){return e.setState({open:!1})}},l.a.createElement("div",null,l.a.createElement(p.q,{"aria-label":"More","aria-owns":this.state.open?"long-menu":null,"aria-haspopup":"true",onClick:this.handleClick},l.a.createElement(x.a,null)),l.a.createElement(p.x,{id:"long-menu",anchorEl:t,open:this.state.open,style:{marginLeft:"50px"}},this.state.options.map(function(t,a){return l.a.createElement(p.y,{key:a,onClick:function(){return e.handleClose(t.key)}},t.value)}))))}}]),t}(l.a.Component),S="create",T=[{name:"test",label:"Group name",type:"text",value:""}],O=[{name:"test",label:"Category name",type:"text",value:""}],j=[{value:"Editare grupa",key:"edit"},{value:"Adaugare categorie",key:"add"}],L=[{value:"Editare categorie",key:"edit"},{value:"Adaugare element",key:"add"}],D=[{id:0,label:"item 1"},{id:2,label:"item 2",disabled:!0},{id:3,label:"item 3",disabled:!1},{id:4,label:"item 4"}],w=[{edit:!0,text:"test3",key:"1",childrens:[{edit:!0,text:"test2",key:"11",childrens:[{edit:!0,text:"test1",key:"111"},{edit:!0,text:"test2",key:"112"}]}]},{edit:!0,text:"test3",key:"2",childrens:[{edit:!0,text:"test2",key:"21",childrens:[{edit:!0,text:"test1",key:"211"},{edit:!0,text:"test2",key:"212"}]}]}],B=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={open:!1,sidebarState:{},expandedAll:!1,renderSidebar:!1,openGroupDialog:!1,groupDialogTitle:"Create new Group",groupDialogType:S,groupButtonText:"send",openCategoryDialog:!1,categoryDialogTitle:"Create new Group",categoryDialogType:S,categoryButtonText:"send"},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e={};!function t(a){a.forEach(function(a){e[a.key]={selected:!1,expanded:!1},a.childrens&&t(a.childrens)})}(w),this.setState({sidebarState:e,renderSidebar:!0})}},{key:"saveGroup",value:function(e){console.log(e)}},{key:"addGroup",value:function(){this.setState({groupDialogType:S,openGroupDialog:!0,groupDialogTitle:"Create group",groupButtonText:"create",enableMultiSelect:!1})}},{key:"toolTipGroupClickHandler",value:function(e,t){console.log(e,t),"edit"===e?this.setState({groupDialogType:"edit",openGroupDialog:!0,groupDialogTitle:"Edit group #"+t,groupButtonText:"edit"}):this.setState({categoryDialogType:"edit",openCategoryDialog:!0,categoryDialogTitle:"Add category #"+t,categoryButtonText:"create"})}},{key:"saveCategory",value:function(e){console.log(e)}},{key:"toolTipCategoryClickHandler",value:function(e,t){"edit"===e&&this.setState({categoryDialogType:"edit",openCategoryDialog:!0,categoryDialogTitle:"Edit category #"+t,categoryButtonText:"create"})}},{key:"handleClick",value:function(e,t){var a=Object.assign({},this.state.sidebarState);"select"===t&&Object.keys(a).forEach(function(e){a[e].selected&&(a[e]={selected:!1,expanded:a[e].expanded})}),a[e]["expand"===t?"expanded":"selected"]=!a[e]["expand"===t?"expanded":"selected"],this.setState({sidebarState:a})}},{key:"toggleExpandAll",value:function(){var e=this,t=Object.assign({},this.state.sidebarState);Object.keys(t).forEach(function(a){t[a]={selected:t[a].selected,expanded:!e.state.expandedAll}}),this.setState({sidebarState:t,expandedAll:!this.state.expandedAll})}},{key:"sidebarTree",value:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return e.map(function(e,r){return e.childrens?l.a.createElement("div",null,l.a.createElement(p.t,{disableGutters:!0,divider:!0,key:e.key,id:e.key,button:!0},l.a.createElement(p.u,{onClick:function(){return t.handleClick(e.key,"expand")}},t.state.sidebarState[e.key].expanded?l.a.createElement(m.b,null):l.a.createElement(m.c,null)),l.a.createElement(p.v,{onClick:function(){return t.handleClick(e.key,"expand")},inset:!0,primary:e.text}),e.edit?l.a.createElement(C,{actionId:e.key,onSelect:function(n){return a?t.toolTipCategoryClickHandler(n,e.key):t.toolTipGroupClickHandler(n,e.key)},options:a?L:j}):null),l.a.createElement(p.f,{in:t.state.sidebarState[e.key].expanded,timeout:"auto",unmountOnExit:!0},l.a.createElement(p.s,{component:"div",disablePadding:!0},t.sidebarTree(e.childrens,!0,++n)))):l.a.createElement(p.t,{disableGutters:!0,dense:!0,divider:!0,key:e.key,onClick:function(){return t.handleClick(e.key,"select")},button:!0,selected:!!t.state.sidebarState[e.key].selected},l.a.createElement(p.u,null,l.a.createElement(m.g,null)),l.a.createElement(p.v,{inset:!0,primary:e.text}))})}},{key:"render",value:function(){var e=this;return this.state.renderSidebar?l.a.createElement("div",{className:"sidebar"},l.a.createElement(E,{fields:T,open:this.state.openGroupDialog,submitButtonText:this.state.groupButtonText,type:this.state.groupDialogType,onSave:function(t){return e.saveGroup(t)},onClose:function(){return e.setState({openGroupDialog:!1})},dialogTitle:this.state.groupDialogTitle,maxWidth:"xs"}),l.a.createElement(E,{fields:O,open:this.state.openCategoryDialog,submitButtonText:this.state.categoryButtonText,type:this.state.categoryDialogType,onSave:function(t){return e.saveCategory(t)},onClose:function(){return e.setState({openCategoryDialog:!1})},multiSelect:!0,multiSelectItems:D,dialogTitle:this.state.categoryDialogTitle,maxWidth:"md"}),l.a.createElement(p.s,{component:"nav",subheader:l.a.createElement(p.w,{component:"div",className:"sidebarSubheader"},this.state.expandedAll?l.a.createElement(p.q,{color:"secondary",onClick:function(){return e.toggleExpandAll()}},l.a.createElement(m.c,null)," "):l.a.createElement(p.q,{color:"secondary",onClick:function(){return e.toggleExpandAll()}},l.a.createElement(m.b,null)," "),l.a.createElement(p.q,{color:"secondary"},l.a.createElement(m.a,{onClick:function(){return e.addGroup()}})))},l.a.createElement(p.l,null),this.sidebarTree(w))):null}}]),t}(n.Component),N=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"homeContainer"},l.a.createElement(p.a,{position:"fixed"},l.a.createElement(p.A,null,l.a.createElement(p.q,{className:this.props.sidebarOpen?"sidebarClosed":null,color:"inherit","aria-label":"Open drawer",onClick:function(){return e.props.toggleSidebar()}},l.a.createElement(m.e,null)),l.a.createElement(p.B,{variant:"h6",style:{paddingLeft:"20px"},color:"inherit",noWrap:!0},"Firma"),l.a.createElement("div",{className:"searchHolder"},l.a.createElement("div",null,l.a.createElement(m.f,{className:"searchIcon"})),l.a.createElement(p.r,{placeholder:"Search\u2026",type:"search"})))))}}]),t}(n.Component),I=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={isLogged:!0,showSidebar:!0},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.isLogged().then(function(){return e.setState({isLogged:!0})}).catch(function(){return e.setState({isLogged:!1})})}},{key:"isLogged",value:function(){return new Promise(function(e,t){e(!0)})}},{key:"changeIsLogged",value:function(e){this.setState({isLogged:e})}},{key:"toggleSidebar",value:function(){this.setState({showSidebar:!this.state.showSidebar})}},{key:"render",value:function(){var e=this;return this.state.isLogged?l.a.createElement("div",{className:"fullHeight",style:{display:"flex"}},l.a.createElement(N,{sidebarOpen:this.state.showSidebar,toggleSidebar:function(){return e.toggleSidebar()}}),this.state.showSidebar?l.a.createElement(B,null):null,l.a.createElement("div",{className:"contentContainer"},l.a.createElement(y,null))):l.a.createElement(g,{isLogged:function(t){return e.changeIsLogged(t)}})}}]),t}(n.Component),H=a(23),M=Object(H.createMuiTheme)({typography:{useNextVariants:!0},overrides:{MuiInput:{underline:{"&:after":{borderBottom:"2px solid #4abdac"}}},MuiFormLabel:{root:{"&$focused":{color:"#4abdac"}}},MuiButton:{containedPrimary:{backgroundColor:"#4abdac","&:hover":{backgroundColor:"#3ea596"}},flatPrimary:{color:"#3ea596"}},MuiCheckbox:{colorPrimary:{"&$checked":{color:"#4abdac"}}},MuiAppBar:{colorPrimary:{backgroundColor:"#3ea596"}},MuiIconButton:{colorSecondary:{color:"#fc4a1a"}},MuiSvgIcon:{colorPrimary:{color:"#4abdac"}},MuiListItem:{root:{paddingRight:"5px",paddingLeft:"18px"}}}}),G=(a(5571),a(5573),a(5575),a(5577),a(5579),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(H.MuiThemeProvider,{theme:M},l.a.createElement("section",{className:"appContainer"},l.a.createElement(I,null)))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[5412,2,1]]]);
//# sourceMappingURL=main.3e38a8d5.chunk.js.map