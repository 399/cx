// 直播管理后台应用逻辑

new Vue({
    el: '#app',
    data() {
        return {
            // 当前激活的标签页
            activeTab: 'preview',
            
            // 直播预告筛选条件
            filters: {
                title: '',
                contentStatus: '',
                liveStatus: '',
                createTimeStart: '',
                createTimeEnd: '',
                liveTimeStart: '',
                liveTimeEnd: ''
            },
            
            // 是否为新增模式
            isAddMode: false,
            
            // 直播列表数据（模拟数据）
            liveList: [
                {
                    id: 1,
                    title: '2023年度产品发布会',
                    contentStatus: 'online',
                    liveStatus: 'notStarted',
                    liveTime: '2023-12-25 14:00:00',
                    createTime: '2023-11-20 10:30:00',
                    liveUrl: 'https://live.example.com/event/2023product',
                    coverImage: './images/demo/cover1.jpg',
                    qrCodeImage: './images/demo/qrcode1.jpg'
                },
                {
                    id: 2,
                    title: '行业趋势分析直播',
                    contentStatus: 'online',
                    liveStatus: 'ongoing',
                    liveTime: '2023-12-01 15:30:00',
                    createTime: '2023-11-15 09:45:00',
                    liveUrl: 'https://live.example.com/event/industry-trends',
                    coverImage: './images/demo/cover2.jpg',
                    qrCodeImage: './images/demo/qrcode2.jpg'
                },
                {
                    id: 3,
                    title: '用户体验设计分享',
                    contentStatus: 'offline',
                    liveStatus: 'ended',
                    liveTime: '2023-11-10 13:00:00',
                    createTime: '2023-10-25 14:20:00',
                    liveUrl: 'https://live.example.com/event/ux-design',
                    coverImage: '',
                teacher: '',
                    qrCodeImage: ''
                },
                {
                    id: 4,
                    title: '技术架构演进之路',
                    contentStatus: 'online',
                    liveStatus: 'notStarted',
                    liveTime: '2023-12-15 10:00:00',
                    createTime: '2023-11-28 16:40:00',
                    liveUrl: 'https://live.example.com/event/tech-architecture',
                    coverImage: './images/demo/cover4.jpg',
                    qrCodeImage: ''
                },
                {
                    id: 5,
                    title: '年终总结与规划',
                    contentStatus: 'offline',
                    liveStatus: 'notStarted',
                    liveTime: '2023-12-30 09:30:00',
                    createTime: '2023-12-01 11:15:00',
                    liveUrl: '',
                    coverImage: './images/demo/cover5.jpg',
                    qrCodeImage: './images/demo/qrcode5.jpg'
                }
            ],
            
            // 回放列表数据（模拟数据）
            replayList: [
                {
                    id: 1,
                    title: '2023年度产品发布会回放',
                    contentStatus: 'online',
                    createTime: '2023-12-26 16:30:00',
                    replayUrl: 'https://replay.example.com/event/2023product',
                    coverImage: './images/demo/cover1.jpg'
                },
                {
                    id: 2,
                    title: '行业趋势分析直播回放',
                    contentStatus: 'offline',
                    createTime: '2023-12-02 17:45:00',
                    replayUrl: 'https://replay.example.com/event/industry-trends',
                    coverImage: './images/demo/cover2.jpg'
                },
                {
                    id: 3,
                    title: '用户体验设计分享回放',
                    contentStatus: 'online',
                    createTime: '2023-11-11 15:20:00',
                    replayUrl: 'https://replay.example.com/event/ux-design',
                    coverImage: '',
                teacher: ''
                }
            ],
            
            // 回放筛选条件
            replayFilters: {
                title: '',
                contentStatus: '',
                createTimeStart: '',
                createTimeEnd: ''
            },
            
            // 编辑相关
            showEditModal: false,
            editingLive: { teacher: '' },
            showReplayEditModal: false,
            editingReplay: { teacher: '' }, // 初始化teacher字段
            isAddReplayMode: false
        };
    },
    
    computed: {
        // 根据筛选条件过滤直播列表
        filteredLiveList() {
            return this.liveList.filter(item => {
                // 标题筛选
                if (this.filters.title && !item.title.includes(this.filters.title)) {
                    return false;
                }
                
                // 内容状态筛选
                if (this.filters.contentStatus && item.contentStatus !== this.filters.contentStatus) {
                    return false;
                }
                
                // 直播状态筛选
                if (this.filters.liveStatus && item.liveStatus !== this.filters.liveStatus) {
                    return false;
                }
                
                // 创建时间筛选
                if (this.filters.createTimeStart) {
                    const createTime = new Date(item.createTime);
                    const startTime = new Date(this.filters.createTimeStart);
                    if (createTime < startTime) {
                        return false;
                    }
                }
                
                if (this.filters.createTimeEnd) {
                    const createTime = new Date(item.createTime);
                    const endTime = new Date(this.filters.createTimeEnd);
                    endTime.setHours(23, 59, 59); // 设置为当天结束时间
                    if (createTime > endTime) {
                        return false;
                    }
                }
                
                // 直播时间筛选
                if (this.filters.liveTimeStart) {
                    const liveTime = new Date(item.liveTime);
                    const startTime = new Date(this.filters.liveTimeStart);
                    if (liveTime < startTime) {
                        return false;
                    }
                }
                
                if (this.filters.liveTimeEnd) {
                    const liveTime = new Date(item.liveTime);
                    const endTime = new Date(this.filters.liveTimeEnd);
                    endTime.setHours(23, 59, 59); // 设置为当天结束时间
                    if (liveTime > endTime) {
                        return false;
                    }
                }
                
                return true;
            });
        },

        // 根据筛选条件过滤回放列表
        filteredReplayList() {
            return this.replayList.filter(item => {
                // 标题筛选
                if (this.replayFilters.title && !item.title.includes(this.replayFilters.title)) {
                    return false;
                }
                
                // 内容状态筛选
                if (this.replayFilters.contentStatus && item.contentStatus !== this.replayFilters.contentStatus) {
                    return false;
                }
                
                // 创建时间筛选
                if (this.replayFilters.createTimeStart) {
                    const createTime = new Date(item.createTime);
                    const startTime = new Date(this.replayFilters.createTimeStart);
                    if (createTime < startTime) {
                        return false;
                    }
                }
                
                if (this.replayFilters.createTimeEnd) {
                    const createTime = new Date(item.createTime);
                    const endTime = new Date(this.replayFilters.createTimeEnd);
                    endTime.setHours(23, 59, 59); // 设置为当天结束时间
                    if (createTime > endTime) {
                        return false;
                    }
                }
                
                return true;
            });
        }
    },
    
    methods: {
        // 切换标签页
        switchTab(tab) {
            this.activeTab = tab;
        },
        
        // 格式化日期
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        },
        
        // 搜索直播
        searchLives() {
            // 在实际应用中，这里会调用API获取数据
            console.log('搜索条件：', this.filters);
        },
        
        // 重置直播预告筛选条件
        resetFilters() {
            this.filters = {
                title: '',
                contentStatus: '',
                liveStatus: '',
                createTimeStart: '',
                createTimeEnd: '',
                liveTimeStart: '',
                liveTimeEnd: ''
            };
        },

        // 重置回放筛选条件
        resetReplayFilters() {
            this.replayFilters = {
                title: '',
                contentStatus: '',
                createTimeStart: '',
                createTimeEnd: ''
            };
        },

        // 搜索回放
        searchReplays() {
            // 在实际应用中，这里会调用API获取数据
            console.log('回放搜索条件：', this.replayFilters);
        },
        
        // 修改直播预告状态（上架/下架）
        changeStatus(item, status) {
            // 在实际应用中，这里会调用API修改状态
            const index = this.liveList.findIndex(live => live.id === item.id);
            if (index !== -1) {
                this.liveList[index].contentStatus = status;
                this.$message({
                    message: `直播「${item.title}」已${status === 'online' ? '上架' : '下架'}`,
                    type: 'success'
                });
            }
        },

        // 修改回放状态（上架/下架）
        changeReplayStatus(item, status) {
            // 在实际应用中，这里会调用API修改状态
            const index = this.replayList.findIndex(replay => replay.id === item.id);
            if (index !== -1) {
                this.replayList[index].contentStatus = status;
                this.$message({
                    message: `回放「${item.title}」已${status === 'online' ? '上架' : '下架'}`,
                    type: 'success'
                });
            }
        },
        
        // 打开回放编辑弹窗
        editReplay(item) {
            this.isAddReplayMode = false;
            this.editingReplay = { ...JSON.parse(JSON.stringify(item)), teacher: item.teacher || '' } // 深拷贝，避免直接修改原数据
            this.showReplayEditModal = true;
        },

        // 关闭回放编辑弹窗
        closeReplayModal() {
            this.showReplayEditModal = false;
            this.editingReplay = {};
            this.isAddReplayMode = false;
        },

        // 打开编辑弹窗
        editLive(item) {
            this.isAddMode = false;
            this.editingLive = { ...JSON.parse(JSON.stringify(item)), teacher: item.teacher || '' }; // 深拷贝，避免直接修改原数据
            
            // 将单一时间格式转换为日期和时间范围
            if (item.liveTime) {
                const liveDateTime = new Date(item.liveTime);
                this.editingLive.liveDate = this.formatDateForInput(liveDateTime);
                this.editingLive.liveTimeStart = this.formatTimeForInput(liveDateTime);
                
                // 默认设置结束时间为开始时间后2小时
                const endDateTime = new Date(liveDateTime.getTime() + 2 * 60 * 60 * 1000);
                this.editingLive.liveTimeEnd = this.formatTimeForInput(endDateTime);
            }
            
            this.showEditModal = true;
        },
        
        // 新增直播预告
        addNewLive() {
            this.isAddMode = true;
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            this.editingLive = {
                id: this.liveList.length > 0 ? Math.max(...this.liveList.map(item => item.id)) + 1 : 1,
                title: '',
                contentStatus: 'offline',
                liveStatus: 'notStarted',
                liveDate: this.formatDateForInput(tomorrow),
                liveTimeStart: '14:00',
                liveTimeEnd: '16:00',
                createTime: this.formatDate(now),
                liveUrl: '',
                coverImage: '',
                teacher: '',
                qrCodeImage: ''
            };
            
            this.showEditModal = true;
        },
        
        // 格式化日期用于input[type="date"]
        formatDateForInput(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        
        // 格式化时间用于input[type="time"]
        formatTimeForInput(date) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        
        // 关闭弹窗
        closeModal() {
            this.showEditModal = false;
            this.editingLive = { teacher: '' };
        },
        
        // 处理封面图上传
        handleCoverUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // 检查文件类型
            if (!file.type.includes('image/')) {
                this.$message.error('请上传图片文件');
                return;
            }
            
            // 在实际应用中，这里会调用API上传图片
            // 这里使用FileReader模拟图片预览
            const reader = new FileReader();
            reader.onload = (e) => {
                this.editingLive.coverImage = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        
        // 移除封面图
        removeCoverImage() {
            this.editingLive.coverImage = '';
            // 重置文件输入框
            if (this.$refs.coverUpload) {
                this.$refs.coverUpload.value = '';
            }
        },
        
        // 处理二维码上传
        handleQrCodeUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // 检查文件类型
            if (!file.type.includes('image/')) {
                this.$message.error('请上传图片文件');
                return;
            }
            
            // 在实际应用中，这里会调用API上传图片
            // 这里使用FileReader模拟图片预览
            const reader = new FileReader();
            reader.onload = (e) => {
                this.editingLive.qrCodeImage = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        
        // 移除二维码图
        removeQrCodeImage() {
            this.editingLive.qrCodeImage = '';
            // 重置文件输入框
            if (this.$refs.qrCodeUpload) {
                this.$refs.qrCodeUpload.value = '';
            }
        },
        
        // 保存编辑
        saveLive() {
            // 合并日期和时间范围为完整的直播时间字符串
            if (this.editingLive.liveDate && this.editingLive.liveTimeStart) {
                // 构建直播时间字符串（使用开始时间作为主要时间）
                const dateStr = this.editingLive.liveDate;
                const timeStr = this.editingLive.liveTimeStart;
                this.editingLive.liveTime = `${dateStr} ${timeStr}:00`;
            }
            
            // 在实际应用中，这里会调用API保存数据
            if (this.isAddMode) {
                // 新增模式
                this.liveList.unshift({ ...this.editingLive });
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
            } else {
                // 编辑模式
                const index = this.liveList.findIndex(live => live.id === this.editingLive.id);
                if (index !== -1) {
                    this.liveList[index] = { ...this.editingLive };
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }
            }
            this.closeModal();
        },
        

        
        // 处理回放封面上传
        handleReplayCoverUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // 检查文件类型
            if (!file.type.includes('image/')) {
                this.$message.error('请上传图片文件');
                return;
            }
            
            // 在实际应用中，这里会调用API上传图片
            // 这里使用FileReader模拟图片预览
            const reader = new FileReader();
            reader.onload = (e) => {
                this.editingReplay.coverImage = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        
        // 移除回放封面
        removeReplayCoverImage() {
            this.editingReplay.coverImage = '';
            // 重置文件输入框
            if (this.$refs.replayCoverUpload) {
                this.$refs.replayCoverUpload.value = '';
            }
        },
        
        // 保存回放编辑
        saveReplay() {
            // 在实际应用中，这里会调用API保存数据
            const index = this.replayList.findIndex(replay => replay.id === this.editingReplay.id);
            
            if (index !== -1) {
                // 编辑现有回放
                this.replayList[index] = { ...this.editingReplay };
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            } else {
                // 新增回放
                this.replayList.unshift({ ...this.editingReplay });
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
            }
            
            this.closeReplayModal();
        },
        
        // 新增直播回放
        addNewReplay() {
            this.isAddReplayMode = true;
            const now = new Date();
            
            this.editingReplay = {
                id: this.replayList.length > 0 ? Math.max(...this.replayList.map(item => item.id)) + 1 : 1,
                title: '',
                contentStatus: 'offline',
                createTime: this.formatDate(now),
                replayUrl: '',
                replayFile: null,
                replayFileName: '',
                coverImage: '',
                teacher: ''
            };
            
            this.showReplayEditModal = true;
        }
    }
});