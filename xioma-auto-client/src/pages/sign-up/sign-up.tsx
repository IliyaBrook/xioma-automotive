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

export const SignUp = (): ReactElement => {
	const [form] = Form.useForm<FieldType>();
	const navigate = useNavigate();
	const  {contextHolder, openNotification} = useNotification()
	
	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
		try {
			const response = await axios.post(`api/auth/register`, values);
			console.log("response", response)
			
			if (response.status === 201) {
				setUserData(response.data);
				window.location.reload();
			}
		} catch (error) {
			if (error) {
				const err = error as { response: { data: { message: string } } };
				const errorMessage = err.response.data.message;
				if (errorMessage.includes('duplicate key error')) {
					openNotification({message: 'Error', description: 'User already exists', type: 'error'});
					return;
				}
				openNotification({message: 'Error', description: 'Wrong username or password', type: 'error'});
			}
		}
	};
	
	const onSignUpLink = () => {
		navigate('/sign-in');
	}
	
	return (
		<AuthLayout>
			<Card>
				<span>If you already have an account <a onClick={onSignUpLink}>Sign in</a></span>
				<h2>Sign Up</h2>
				<Form
					form={form}
					name='basic'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete='off'
					labelCol={{ span: 24 }}
					style={{ maxWidth: 600 }}
				>
					<Form.Item<FieldType>
						label='Username'
						name='name'
						rules={[
							{ required: true, message: 'Username field cannot be empty!' },
							{ min: 3, message: 'Username must be at least 3 characters long' },
						]}
					>
						<Input />
					</Form.Item>
					
					<Form.Item<FieldType>
						label='Password'
						name='password'
						rules={[
							{ required: true, message: 'Password field cannot be empty!' },
							{ min: 6, message: 'Password must be at least 6 characters long' },
						]}
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

export default SignUp