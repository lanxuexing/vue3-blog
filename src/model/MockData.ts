import { ColumnProps, PostProps, UserProps } from '@/model/DataProps'

export const testData: ColumnProps[] = [
  {
    _id: '1',
    title: 'test1的专栏',
    description: '这里是test1专栏，有一段非常有意思的简介，可以更新一下噢',
    avatar: {
      url: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
    }
  },
  {
    _id: '2',
    title: 'test2的专栏',
    description: '这里是test2专栏，有一段非常有意思的简介，可以更新一下噢'
    // avatar: {
    //   url: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
    // }
  },
  {
    _id: '3',
    title: 'test3的专栏',
    description: '这里是test3专栏，有一段非常有意思的简介，可以更新一下噢',
    avatar: {
      url: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
    }
  },
  {
    _id: '4',
    title: 'test4的专栏',
    description: '这里是test4专栏，有一段非常有意思的简介，可以更新一下噢',
    avatar: {
      url: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
    }
  },
  {
    _id: '5',
    title: 'test5的专栏',
    description: '这里是test5专栏，有一段非常有意思的简介，可以更新一下噢',
    avatar: {
      url: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg'
    }
  }
]

export const testPosts: PostProps[] = [
  {
    _id: '1',
    title: '这是我的第一篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image: {
      url: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110'
    },
    createdAt: '2020-06-11 10:34:22',
    column: '1'
  },
  {
    _id: '2',
    title: '这是我的第二篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    createdAt: '2020-06-11 10:34:22',
    column: '1'
  },
  {
    _id: '3',
    title: '这是我的第三篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image: {
      url: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110'
    },
    createdAt: '2020-06-11 10:34:22',
    column: '1'
  }
]

export const testUser: UserProps = {
  isLogin: true,
  name: 'muziyu',
  id: 1,
  columnId: 1
}
