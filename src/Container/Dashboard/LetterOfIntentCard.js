import React from 'react';

function LetterOfIntentCard({className, loiCreated, handleEditMode}) {
  return (
    <div className={'' + (className ? className : '')}>
      <div className='flex justify-space-between padding-x20 padding-b15 border-b border-282828'>
        <div className='text-24'>Expected Terms</div>
        <div></div>
      </div>
      <div className='text-16 padding-y20 padding-x20'>{ loiCreated ? 'Review and modify your proposal for potential investors' : 'Use this tool to share your ask with potential investors'}</div>
      <div className='padding-x20 flex justify-center margin-b10'>
        <div className='padding-y10 border-white border-radius5 w-full text-center cursor-pointer' onClick={handleEditMode}>
          {loiCreated ? 'View & Edit your terms' : 'Add your terms'}
        </div>
      </div>
    </div>
  )
}

export default LetterOfIntentCard;