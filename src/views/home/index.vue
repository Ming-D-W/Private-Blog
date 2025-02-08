<template>
  <div>
    <el-form :model="wlong" label-width="80px">
      <el-form-item label="中午吃啥" prop="lunch">
        <el-select v-model="wlong.lunch" placeholder="中午吃啥" size="small">
          <el-option
            v-for="(t, i) of lunchList"
            :key="i"
            :label="t.label"
            :value="t.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="wlong.dinner" placeholder="晚上吃啥" size="small">
          <el-option
            v-for="(t, i) of dinnerList"
            :key="i"
            :label="t.label"
            :value="t.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wlong: {
        lunch: "1",
        dinner: "2",
      },
      lunchList: [
        { label: "西北风", value: "1" },
        { label: "米饭", value: "2" },
        { label: "面条子", value: "3" },
        { label: "炒饭", value: "4" },
        { label: "炒面", value: "5" },
      ],
      dinnerList: [
        { label: "西北风", value: "1" },
        { label: "米饭", value: "2" },
        { label: "面条子", value: "3" },
        { label: "炒饭", value: "4" },
        { label: "炒面", value: "5" },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style></style>
