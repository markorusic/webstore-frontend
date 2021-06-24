import { useHistory, useLocation } from 'react-router'

export const useURLQuery = <T>(initialValues?: T) => {
  const location = useLocation()
  const history = useHistory()

  const params = {
    ...initialValues,
    ...Object.fromEntries(new URLSearchParams(location.search))
  } as T
  const setParam = (name: keyof T, value: string | number) => {
    console.log('setParam', name, value)
    const newParams = Object.entries({
      ...params,
      [name]: value
      // @ts-ignore
    }).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})
    const search = new URLSearchParams(newParams).toString()
    history.push({ search })
  }

  const setParams = (updatedParams: any) => {
    console.log('setParams', updatedParams)
    const newParams = Object.entries({
      ...params,
      ...updatedParams
      // @ts-ignore
    }).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})
    const search = new URLSearchParams(newParams).toString()
    // console.log('da2', newParams, search)
    history.push({ search })
  }

  return {
    params,
    setParam,
    setParams
  }
}
