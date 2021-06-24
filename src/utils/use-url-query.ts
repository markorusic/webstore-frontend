import { useHistory, useLocation } from 'react-router'

export const useURLQuery = <T>(initialValues?: T) => {
  const location = useLocation()
  const history = useHistory()

  const params = {
    ...initialValues,
    ...Object.fromEntries(new URLSearchParams(location.search))
  } as T
  const setParam = (name: keyof T, value: string) => {
    const newParams = Object.entries({
      ...params,
      [name]: value
      // @ts-ignore
    }).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})
    const search = new URLSearchParams(newParams).toString()
    history.push({ search })
  }

  return {
    params,
    setParam
  }
}
