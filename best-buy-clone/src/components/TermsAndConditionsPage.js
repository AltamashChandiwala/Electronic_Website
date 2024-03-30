import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsAndConditionsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Terms and Conditions</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <p className="card-text text-justify">Welcome to Tech Store! These terms and conditions outline the rules and regulations for the use of our website.</p>
                <h4>Acceptance of Terms</h4>
                <p className="card-text text-justify">By accessing and using our website, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, please do not use our website.</p>
                <h4>Use License</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Permission is granted to temporarily download one copy of the materials (information or software) on Tech Store's website for personal, non-commercial transitory viewing only.</li>
                  <li className="list-group-item">This is the grant of a license, not a transfer of title, and under this license, you may not:
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Modify or copy the materials.</li>
                      <li className="list-group-item">Use the materials for any commercial purpose or public display (commercial or non-commercial).</li>
                      <li className="list-group-item">Attempt to decompile or reverse engineer any software contained on Tech Store's website.</li>
                      <li className="list-group-item">Remove any copyright or other proprietary notations from the materials.</li>
                    </ul>
                  </li>
                </ul>
                <h4>Disclaimer</h4>
                <p className="card-text text-justify">The materials on Tech Store's website are provided on an 'as is' basis. Tech Store makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                <h4>Limitations</h4>
                <p className="card-text text-justify">In no event shall Tech Store or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tech Store's website, even if Tech Store or a Tech Store authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                <h4>Changes to Terms</h4>
                <p className="card-text text-justify">Tech Store may revise these terms of use for its website at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms and conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
