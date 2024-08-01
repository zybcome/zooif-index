// import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

// Vue.use(Element, { locale })

import Vue from 'vue'
import {
  Message,
  Notification,
  Loading,
  Popover,
  MessageBox,
  Button,
  Input,
  Form,
  FormItem,
  Checkbox,
  Alert,
  Dialog,
  Tooltip,
  Select,
  Option,
  Tag,
  Table,
  TableColumn
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
    Message, Notification,Popover,MessageBox,Button,Input,Form,FormItem,Checkbox,Alert,Dialog,Tooltip,Select,Option,Tag,Table,TableColumn
];

const Element = {
    install(Vue) {
        components.forEach(component => {
            Vue.component(component.name, component)
        })
    }
}
Vue.prototype.msgTip = '';
Vue.prototype.msgTip1 = '';
Vue.prototype.msgjoinTip = '';
Vue.prototype.$MessageBox = MessageBox
Vue.use(Loading)
Vue.use(Loading.directive)
Vue.use(Element, { locale })
