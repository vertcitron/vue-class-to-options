import chalk from 'chalk'
import displayError from '../display/displayError'

export default (source: string): boolean => {
  if (!source) {
    displayError('The source file is empty.')
    return false
  }
  if (!source.match(/<script.*>.*<\/script>/gs)) {
    displayError('The source file does not contain any <script> tag.')
    return false
  }
  if (!source.match(/@Component/gs)) {
    displayError('The source file does not contain an @Component decorator.')
    return false
  }
  if (!source.match(/export default class .* extends Vue {.*}/gs)) {
    displayError('The source file does not contain an @Component decorator.')
    return false
  }
  if (source.match(/<script.*>.*@Component.*export default class .* extends Vue {.*}.*<\/script>/gs)) {
    return true
  }
  displayError('Unknown component validation error.')
  return false
}
