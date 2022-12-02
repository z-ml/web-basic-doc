<template>
  <div :class="[bem.b()]">
    <slot name="leftButton"></slot>
    <div>
      <div v-if="!simplePage" class="fl nav-not-selected total-count">
        共<span class="total-text"> {{ formatNum(pageData.totalCount) }} </span
        >条记录
      </div>
      <ul class="page-body fr">
        <li
          class="page-item page-turning border"
          :class="{ 'page-disabled': pageData.pageNum === 1 }"
          @click="previousPage(pageData.pageNum)"
        >
          <Icon type="ios-arrow-back" />
        </li>
        <li class="fl overflow" v-if="pageShow">
          <div>
            <!-- 当页码大于5时显示1 -->
            <div
              class="page-item border"
              v-if="pageData.pageNum > 5"
              @click="jumpPage(1)"
            >
              1
            </div>
            <!-- 当页码大于5时可以向前跳转5页 -->
            <div
              class="page-item border"
              v-if="pageData.pageNum > 5"
              title="向前5页"
              @click="jumpPage(pageData.pageNum - 5)"
            >
              <Icon type="ios-more" />
            </div>
            <!-- 当页码大于5时只显示当前页码前面两个页面 如当前页码为6 则显示4,5 -->
            <div class="fl border" v-if="pageData.pageNum > 5 && !simplePage">
              <div
                class="page-item"
                v-for="item in 2"
                :key="item"
                @click="jumpPage(pageData.pageNum - 3 + item)"
              >
                {{ pageData.pageNum - 3 + item }}
              </div>
            </div>
            <!-- 当页码小于5时显示页码之前所有的页码 如当前页码为4 则显示1,2,3 -->
            <div class="fl" v-if="pageData.pageNum <= 5 && !simplePage">
              <div
                class="page-item border"
                v-for="(item, index) in pageData.pageNum - 1"
                :key="index"
                @click="jumpPage(item)"
              >
                {{ item }}
              </div>
            </div>
            <!-- 当前页码 -->
            <div
              class="page-item page-item-active border"
              @click="jumpPage(pageData.pageNum)"
            >
              {{ pageData.pageNum }}
            </div>
            <!-- 当总页码-当前页码 大于等于5时 显示当前页面后两个 如当前页码为10 则显示11,12 -->
            <div
              class="fl"
              v-if="!simplePage && totalPage - pageData.pageNum >= 5"
            >
              <div
                class="page-item border"
                v-for="item in 2"
                :key="item"
                @click="jumpPage(pageData.pageNum + item)"
              >
                {{ pageData.pageNum + item }}
              </div>
            </div>
            <!-- 当总页码-当前页码 小于5时 显示当前页码后的所有页码 如当前页码为17 则显示18,19,20 -->
            <div class="fl" v-if="totalPage - pageData.pageNum < 5">
              <div
                class="page-item border"
                v-for="(item, index) in totalPage - pageData.pageNum"
                :key="index"
                @click="jumpPage(pageData.pageNum + item)"
              >
                {{ pageData.pageNum + item }}
              </div>
            </div>
            <!-- 当总页码-当前页码大于5时 显示跳转后5页 -->
            <div
              class="page-item border"
              v-if="totalPage - pageData.pageNum >= 5"
              title="向后5页"
              @click="jumpPage(pageData.pageNum + 5)"
            >
              <Icon type="ios-more" />
            </div>
            <!-- 当总页码-当前页码大于5时 显示最后一页 -->
            <div
              class="page-item border"
              v-if="totalPage - pageData.pageNum >= 5 && hasLast"
              @click="jumpPage(totalPage)"
            >
              {{ totalPage }}
            </div>
          </div>
        </li>
        <li class="fl overflow" v-if="!pageShow">
          <!-- 当前页码 -->
          <div class="page-item page-item-active border">
            {{ pageData.pageNum }}
          </div>
        </li>
        <li
          class="page-item page-turning border"
          :class="{ 'page-disabled': pageData.pageNum === totalPage }"
          @click="nextPage(pageData.pageNum)"
        >
          <Icon type="ios-arrow-forward" />
        </li>
        <Select
          v-model="pageData.pageSize"
          class="page-selection fl"
          :transfer="transfer"
          @on-change="changePageSize"
          v-if="!simplePage"
        >
          <Option
            v-for="item in pageList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
        <li v-if="hasLast" class="page-item total-page border">
          共{{ totalPage }}页
        </li>
        <div class="page-jump" v-if="pageShow">
          跳至<InputNumber
            v-model.number="jumpNum"
            @keyup.enter="jumpPage(jumpNum)"
            class="page-input"
            :max="totalPage"
            :min="1"
          ></InputNumber
          >页
        </div>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { formatNum, createNamespace } from '@web-basic-doc/utils'
const bem = createNamespace('page')

defineOptions({
  name: 'ui-page',
})
const props = defineProps({
  /**
   * totalCount:数据总数
   * pageNum:当前页码
   * pageSize:当前页码条数
   */
  pageData: {
    required: true,
  },
  // 是否包含最后一页
  hasLast: {
    default() {
      return true
    },
  },
  pageShow: {
    default() {
      return true
    },
  },
  // 短小一些，不会显示很多页码展开并且不能选择pageSize -- add by ning
  simplePage: {
    default() {
      return false
    },
  },
  transfer: {
    type: Boolean,
    default: false,
  },
  pageList: {
    default() {
      return [
        { label: '10 条/页', value: 10 },
        { label: '20 条/页', value: 20 },
        { label: '50 条/页', value: 50 },
        { label: '100 条/页', value: 100 },
      ]
    },
  },
})
const emit = defineEmits(['changePage', 'changePageSize'])

let jumpNum = $ref(null)
const totalPage = $computed(() =>
  props.pageData.totalCount === 0
    ? 1
    : Math.ceil(props.pageData.totalCount / props.pageData.pageSize)
)

function jumpPage(page) {
  props.pageData.pageNum = page
  emit('changePage', page)
}
function previousPage(page) {
  if (page === 1) {
    return false
  }
  props.pageData.pageNum = page - 1
  emit('changePage', page - 1)
}
function nextPage(page) {
  if (page === props.totalPage) {
    return false
  }
  props.pageData.pageNum = page + 1
  emit('changePage', page + 1)
}
function changePageSize() {
  props.pageData.pageNum = 1
  emit('changePageSize', props.pageData.pageSize)
}
</script>
