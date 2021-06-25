import { PageContainer } from '../components/customer/page-container'
import { useCustomer } from '../services/customer-service'

export const Profile = () => {
  const [customer] = useCustomer()
  return (
    <PageContainer>
      <h1>Profile</h1>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
    </PageContainer>
  )
}
