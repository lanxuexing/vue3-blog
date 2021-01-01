<template>
  <div class="create-post-page">
    <h4>新建博客</h4>
    <upload
      action="/api/upload"
      :beforeUpload="uploadCheck"
      :uploaded="uploadedData"
      @file-uploaded="handleFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    />
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入博客标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入博客详情"
          tag="textarea"
          rows="10"
        />
      </div>
      <template v-slot:submit>
        <button class="btn btn-primary btn-large">发表博客</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '@/components/form/ValidateForm.vue'
import ValidateInput from '@/components/form/ValidateInput.vue'
import Upload from '@/components/Upload.vue'
import {
  RulesProp,
  GlobalDataProps,
  PostProps,
  ResponseType,
  ImageProps
} from '@/model/DataProps'
import { beforeUploadCheck, createMessage } from '@/utils/helper'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput,
    Upload
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const titleVal = ref('')
    const contentVal = ref('')
    const uploadedData = ref()
    const isEdit = !!route.query.id
    let imageId = ''
    const titleRules: RulesProp = [
      { type: 'required', message: '博客标题不能为空' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '博客详情不能为空' }
    ]
    onMounted(() => {
      if (isEdit) {
        store.dispatch('fetchPost', route.query.id).then((rawData: ResponseType<PostProps>) => {
          const currentPost = rawData.data
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image }
          }
          titleVal.value = currentPost.title
          contentVal.value = currentPost.content || ''
        })
      }
    })
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          const actionName = isEdit ? 'updatePost' : 'createPost'
          const sendData = isEdit ? {
            id: route.query.id,
            payload: newPost
          } : newPost
          store.dispatch(actionName, sendData).then(() => {
            createMessage('发表成功， 2s后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({
                name: 'detail',
                params: {
                  id: column
                }
              })
            }, 2000)
          })
        }
      }
    }
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是JPG/PNG格式！', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1Mb', 'error')
      }
      return passed
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      uploadedData,
      handleFileUploaded,
      uploadCheck
    }
  }
})
</script>

<style scoped>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
