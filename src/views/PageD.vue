<template>
    <div class="page-d">
        <div class="header">
            <el-input v-model="keyword" placeholder="请输入内容"></el-input>
            <el-button @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        </div>

        <!-- 列表 -->
        <el-table :data="tableData" stripe border>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="(isShowTagPop = true, currRow = scope.row)" type="text" size="small">添加tag</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination 
            @current-change="change" 
            class="pagination" 
            background 
            layout="prev, pager, next" 
            :total="total" 
            :current-page="pageParam.page"
            hide-on-single-page></el-pagination>

        <!-- 添加窗口 -->
        <el-dialog title="添加/编辑" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 打标签窗口 -->
        <el-dialog title="打标签" :visible.sync="isShowTagPop" width="400px">
            <el-select v-model="tags" style="width:100%" multiple placeholder="请选择标签">
                <el-option label="tag1" value="tag1"></el-option>
                <el-option label="tag2" value="tag2"></el-option>
                <el-option label="tag3" value="tag3"></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowTagPop = false">取消</el-button>
                <el-button type="primary" @click="handleAddTags">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addUser, updateUser, delUser, getList, addTags } from '@/api'

export default {
    name: "PageD",
    data() {
        return {
            keyword: "",
            tableData: [],
            total: 0,
            pageParam: {
                page: 1, 
                pageSize: 10
            },
            form: {
                name: "",
                desc: ""
            },
            dialogFormVisible: false,
            formLabelWidth: "70px",

            isShowTagPop: false,
            tags: [],
            currRow: {}
        }
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            const list = await getList({keyword: this.keyword, ...this.pageParam});
            this.tableData = list?.data ?? [];
            this.total = list?.total ?? 0;
        },
        handleSearch() {
            this.pageParam.page = 1;
            this.getList();
        },
        async handleAdd() {
            if (this.form.id) {
                await updateUser(this.form)
            } else {
                await addUser(this.form)
            }
            this.form = {
                name: "",
                desc: ""
            }
            this.dialogFormVisible = false;
            this.pageParam.page = 1;
            this.getList();
        },
        handleEdit(row) {
            this.form = row
            this.dialogFormVisible = true;
        },
        async handleDelete(row) {
            await delUser({id: row.id})
            this.pageParam.page = 1;
            this.getList();
        },
        change(page) {
            this.pageParam.page = page;
            this.getList();
        },
        async handleAddTags() {
            await addTags({
                tags: this.tags,
                userId: this.currRow.id
            })
            this.isShowTagPop = false;
            this.currRow = {};
            this.tags = []
        }
    }
}
</script>

<style lang="scss" scoped>
.page-d {
    padding: 0 20px;
    .header {
        display: flex;
        max-width: 500px;
        margin-bottom: 30px;
        .el-input {
            margin-right: 10px;
        }
    }
    .pagination {
        margin-top: 30px;
        text-align: right;
    }
}
</style>
