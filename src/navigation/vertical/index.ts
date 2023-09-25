// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      icon: 'mdi:home-outline',
      title: 'Software',
      children: [
        {
          icon: 'mdi:chart-donut',
          title: 'Computer software types',
          path: '/software/computerSoftwareType'
        },
        {
          icon: 'mdi:chart-donut',
          title: 'Software sub types',
          path: '/software/softwareSubType'
        },
        {
          icon: 'mdi:chart-donut',
          title: 'Software types',
          path: '/software/softwareType'
        },
        {
          icon: 'mdi:chart-donut',
          title: 'Softwares',
          path: '/software/software'
        }
      ]
    }
  ]
}

export default navigation
