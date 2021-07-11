import { shallowMount } from '@vue/test-utils'
import PointList from '../../../src/components/PointList/index.vue'

describe('PointList.vue', () => {
  it('renders props when passed', () => {
    const pointArray = [{ name: 'vuex' }, { name: 'vue-router' }]
    const wrapper = shallowMount(PointList, {
      propsData: {
        pointList: pointArray
      }
    })
    expect(wrapper.props().pointList).toHaveLength(2);
  })
})
