import { useHasMounted } from "@/hooks/customHook";
import { Button, Form, Input, Modal, Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { resendOTP, verifyOTP } from "@/api/auth/auth";

interface IProps {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  userEmail: string;
}

const ModalReactive = ({ setIsModalOpen, isModalOpen, userEmail }: IProps) => {
  const hasMounted = useHasMounted();
  const [current, setCurrent] = useState(0);
  const [userID, setUserID] = useState(0);
  const [form] = Form.useForm();
  const onFinishStep0 = async (email: string) => {
    const res = await resendOTP(email);
    if (res.statusCode === 200) {
      setCurrent(1);
      setUserID(res.data.id);
    }
  };
  const onFinishStep1 = async () => {
    const values = await form.validateFields();
    const { code } = values;
    console.log("code: ", code);
    const res = await verifyOTP(userID, code);

    if (res.data) {
      setCurrent(2);
    } else {
      throw new Error("OTP không hợp lệ.");
    }
  };
  if (!hasMounted) return <></>;
  return (
    <>
      <Modal
        title="Kích hoạt tài khoản"
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => {
          setCurrent(0);
          setIsModalOpen(false);
        }}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Login",
              //   status: "finish",
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              //   status: "finish",
              icon: <SolutionOutlined />,
            },
            {
              title: "Done",
              //   status: "wait",
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current == 0 && (
          <>
            <div className="mt-5">
              <p>Tài khoản của bạn chưa được kích hoạt</p>
              <Input className="my-5" name="email" value={userEmail} disabled />
              <Button type="primary" onClick={() => onFinishStep0(userEmail)}>
                Resend
              </Button>
            </div>
          </>
        )}
        {current == 1 && (
          <div className="">
            <Form
              form={form}
              name="basic"
              autoCapitalize="off"
              layout="vertical"
            >
              <Form.Item
                label="code"
                name="code"
                rules={[{ required: true, message: "Please input your code!" }]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" onClick={() => onFinishStep1()}>
                Kích hoạt
              </Button>
            </Form>
          </div>
        )}
        {current == 2 && (
          <>
            <div className="mt-5">
              <p>
                Tài khoản của bạn đã được kích hoạt. Vui lòng đăng nhập lại!
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalReactive;
