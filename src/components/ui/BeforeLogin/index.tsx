import React from "react";

/**
 * // https://payloadcms.com/docs/admin/components#root-components
 */
const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Welcome to your dashboard!</b>
        {" This is where site admins will log in to manage your website."}
      </p>
    </div>
  );
};

export default BeforeLogin;
