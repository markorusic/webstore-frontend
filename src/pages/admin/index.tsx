import { PageContainer } from '../../components/admin/page-container'
import { locale } from '../../localization'
import { useAdmin } from '../../services/admin-service'

export const Home = () => {
  const [admin] = useAdmin()
  return (
    <PageContainer>
      <h1 className="text-center">
        {locale.welcome} {admin?.user.firstName}
      </h1>
    </PageContainer>
  )
}
