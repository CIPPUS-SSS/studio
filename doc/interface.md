前缀: /adm0in/|||
-----
leaveMsg [#游客留言:页面]|get|-|data #留言消息 [数组]
leaveMsgOk [#审核留言: 通过]|post|msg #消息id [数组 | 单个]|[页面刷新]
leaveMsgOkJ [#审核留言: 通过]|post|msg[] #消息id [数组 | 单个]|?{success:1} or {success:0}
leaveMsgNo [#审核留言: 不通过]|post|msg #消息id [数组 | 单个]|[页面刷新]
leaveMsgNoJ [#审核留言: 不通过]|post|msg[] #消息id [数组 | 单个]|?{success:1} or {success:0}
leaveMsgDel [#处理留言: 删除]|msg #消息id [数组 | 单个]|[页面刷新]
leaveMsgDelJ [#处理留言: 删除]|msg[] #消息id [数组 | 单个]	|? {success:1} or {success:0}
leaveMsgC [#回复留言]	|uname[String] uemail[String] content #回复内容[String] id #留言id[String]|[页面刷新]
leaveMsgCDel [#删除留言回复]|id #回复id[String]|[页面刷新]
feedback [#成员反馈:获取消息]|get|-|data #反馈消息 [数组]
feedbackDel [#成员反馈:删除消息]|p|msg #消息id [数组 | 单个]|[页面刷新]
feedbackDelJ [#成员反馈:删除消息]|-|msg[]  #消息id [数组 | 单个]|	?{success:1} or {success:0}
feedbackC  [#回复留言]|	uname[String] uemail[String] content #回复内容 [String] id #留言id [String]|[页面刷新]
feedbackCDel [#删除留言回复]|id #回复id [String]|[页面刷新]
joinMsg [#加入组织:获取信息]|g|-|data #页面信息 [数组]
joinMsgOkJ [#加入组织:通过]||	msg #消息id [数组 | 单个]|	?{success:1} or {success:0}
joinMsgNoJ [#加入组织:不通过]||	msg [#消息id] [数组 | 单个]|	?\n\r{success:1}\n\r{success:0}
projectMsg [#项目申请:获取信息]	|g|	-|	data [#项目消息] [数组]
projectMsgOkJ [#项目申请:通过]|		|msg [#消息id] [数组 | 单个]	|?\n\r{success:1}\n\r{success:0}
projectMsgNoJ [#项目申请:不通过] | |msg [#消息id] [数组 | 单个]	|?\n\r{success:1}\n\r{success:0}
			
(前缀)  /user			
/info
[#用户:个人资料]	g	-	data
[#个人信息]
[对象]
/infoEdit
[#个人资料:获取]	g	-	ddd
/infoEdit
[#个人资料:修改]		mid[#学号][String]
userEmail[String]
userGrade[#年级][String]
userNickName[#昵称][String]
	[页面刷新]
/pswEdit
[#个人资料:获取]	g	-	[页面刷新]
/pswEdit
[#个人资料:修改]		oPwd[#旧密码][String]
oPwd[#新密码][String]
	[页面刷新]
/login
[#用户登录]	g	-	[页面刷新]
/login
[#用户登录]		username[#用户名][String]
password[#密码][String]	
/projectInfo 
[#参与项目信息:
获取信息]	g	-	data
[#项目信息]
[对象]
/projectMy
[#我的项目:获取信息]	g	-	data
[#我的项目]
[数组]
/projectsList
[#项目列表:获取信息]	g	-	data
[#项目信息]
[数组]
/projectsList
[#项目列表:分类信息]	p	ptype[#项目类型][String]	[页面刷新]
/joinProjects
[#项目申请:提交]	p	pid[#项目id][String]
content[#申请说明][String]-	[页面刷新]
/joinGroup
[#加入组织:获取信息]	g	-	[页面刷新]
/joinGroup
[#项目申请:提交]	p	groupId[#组id][String]
content[#申请说明][String]	[页面刷新]
/sendFeedBack
[#发表反馈:页面]	g	-	[页面刷新]
/sendFeedBack
[#发表反馈:提交]	p	content[#反馈内容][String]	[页面刷新]
/leavemsg
[#游客留言:页面]	g	-	
/leavemsg
[#游客留言:页面]	p	uname[String]
email[String]
content[String]	[页面刷新]
/logout
[#用户注销]	g	-	[页面重定向]
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			




正在修改..
?技能树编辑..  ?志同道合  skillSame   由于id修改,所以逻辑需要改..
??? projectsClass  我的项目: 退出项目.. 原来的不能用了..

正在写..
?发布部分..     loading
?人员部分..     loading
