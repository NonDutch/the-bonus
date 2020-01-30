import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../components/layout";
import Yearly from "../components/yearly";
import Monthly from "../components/monthly";
import { request } from "../handlers/authentication";
import { save, retrieve, remove } from "../utils/persist";
import { addInitialHours, addHours, getInitialHours } from "../handlers/hours";

function Dashboard() {
  const router = useRouter();
  const email = retrieve("email");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expiresIn = retrieve("expiresIn");
    const handleError = () => {
      remove(["token", "expiresIn"]);
      router.push("/");
    };

    if (expiresIn && +new Date() < +new Date(+expiresIn)) {
      const { access_token: accessToken } = retrieve("token");

      request({ url: "/api/validity", data: { accessToken } })
        .then(() => addInitialHours(email))
        .then(() => setLoading(false))
        .catch(handleError);
    } else {
      handleError();
    }
  }, []);

  if (loading)
    return (
      <Layout>
        <span className="loading">Loading...</span>
      </Layout>
    );

  return (
    <Layout>
      <section className="dashboard">
        <Tabs>
          <TabList>
            <Tab>Monthly</Tab>
            <Tab>Yearly</Tab>
          </TabList>

          <TabPanel forceRender={true}>
            <Monthly
              getInitialHours={() => getInitialHours(email)}
              addHours={(month, hours) => addHours(email, month, hours)}
            />
          </TabPanel>

          <TabPanel forceRender={true}>
            <Yearly />
          </TabPanel>
        </Tabs>
      </section>
    </Layout>
  );
}

export default Dashboard;
