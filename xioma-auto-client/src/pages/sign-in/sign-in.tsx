import { useNotification } from '@src/hooks/useNotification.tsx'
import AuthLayout from '@src/Layouts/AuthLayout.tsx'
import { setUserData } from '@src/utils/userData.ts'
import { Button, Card, Form, type FormProps, Input } from 'antd'
import axios from 'axios'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type FieldType = {
	name?: string;
	password?: string;
};

export const SignIn = (): ReactElement => {
	const [form] = Form.useForm<FieldType>();
	const navigate = useNavigate();
	const  {contextHolder, openNotification} = useNotification()
	
	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
		try {
			const response = await axios.post(`api/auth/login`, values, {withCredentials: false});
			
			if (response.status === 200) {
				setUserData(response.data);
				window.location.reload();
			}
		} catch (error) {
			form.setFields([
				{
					name: 'password',
					errors: ['Invalid, please check username or password'],
				},
			]);
			openNotification({message: 'Error', description: 'Wrong username or password', type: 'error'});
		}
		
	};
	
	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	
	const onSignUpLink = () => {
		navigate('/sign-up');
	}
	
	return (
		<AuthLayout>
			<Card>
				<span>Don't have an account? <a onClick={onSignUpLink}>Sign up</a></span>
				<h2>Sign In</h2>
				<Form
					form={form}
					name='basic'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
					labelCol={{ span: 24 }}
					style={{ maxWidth: 600 }}
				>
					<Form.Item<FieldType>
						label='Username'
						name='name'
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>
					
					<Form.Item<FieldType>
						label='Password'
						name='password'
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>
					
					<Form.Item wrapperCol={{ offset: 9, span: 24 }}>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
			{contextHolder}
		</AuthLayout>
	)
}

export default SignIn